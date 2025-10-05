const { validationResult } = require('express-validator');
const { createRide, getFare } = require('../services/ride.service.js');
const mapsService = require('../services/maps.service.js');
const Captain = require('../models/captain.model.js');
const Ride = require('../models/ride.model.js');
const { sendMessageToSocketId } = require('../socket.js');


const createRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    const User = req.User


    if (!User || !pickup || !destination || !vehicleType) {
        return res.status(400).json({ error: 'User, pickup, destination, and vehicle type are required' });
    }

    try {
        const ride = await createRide(User, pickup, destination, vehicleType);


        const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);
        const captainRadius = await mapsService.getCaptainInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 5);
        res.status(201).json({ ride, captainRadius });

        ride.otp = ''; // Hide OTP for security
        const rideWithUser = await Ride.findById(ride._id).populate('user');

        captainRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, { type: 'new-ride', data: rideWithUser});
        })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' + error.message });
    }
};

const getFareController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    if (!pickup || !destination) {
        return res.status(400).json({ error: 'Pickup and destination are required' });
    }

    try {
        const fares = await getFare(pickup, destination);
        return res.status(200).json(fares);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createRideController,
    getFareController
};
