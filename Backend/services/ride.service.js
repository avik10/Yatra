const { getDistanceTime } = require('../services/maps.service.js');
const Ride = require('../models/ride.model.js');
const crypto = require("crypto");
const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination required');
    }
    try {

        const distanceTime = await getDistanceTime(pickup, destination);
        const distance = distanceTime.distance; // Assuming distance is in kilometers

        const baseFare = 10; // Base fare in currency units
        const farePerKm = {
            auto: 10, // Fare per kilometer for auto
            rickshaw: 15, // Fare per kilometer for rickshaw
            toto: 15 // Fare per kilometer for toto
        };

        const calculateFare = (distance, rate) => {
            return baseFare + distance > 2 ? Math.round(distance - 2) * rate : rate
        };

        const fares = {
            auto: calculateFare(distance, farePerKm.auto),
            rickshaw: calculateFare(distance, farePerKm.rickshaw),
            toto: calculateFare(distance, farePerKm.toto)
        };

        return fares;
    } catch (error) {
        console.error('Error calculating fare:', error);
        throw new Error('Unable to calculate fare');
    }
}

const generateOTP = (numDigits) => {
    if (!numDigits || numDigits <= 0) {
        throw new Error('Number of digits must be a positive integer');
    }
    const otp = crypto.randomInt(0, Math.pow(10, numDigits)).toString().padStart(numDigits, '0');
    return otp;
};


const createRide = async (User, pickup, destination, vehicleType) => {
    if (!User || !pickup || !destination || !vehicleType) {
        throw new Error('UserId ,Pickup, destination, and vehicle type are required');
    }
    try {
        const fares = await getFare(pickup, destination);
        const fare = fares[vehicleType];

        if (!fare) {
            throw new Error('Invalid vehicle type');
        }
        // Assuming you have a Ride model to save the ride details
        const ride = await Ride.create({
            User,
            pickup,
            destination,
            fare,
            otp: generateOTP(6)
        });

        return ride;
    } catch (error) {
        console.error('Error creating ride:', error);
        throw new Error('Unable to create ride');
    }
};

module.exports = {
    createRide,
    getFare,
    generateOTP
};
