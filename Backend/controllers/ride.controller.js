const { validationResult } = require('express-validator');
const { createRide, getFare } = require('../services/ride.service.js');

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
        return res.status(201).json(ride);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
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
