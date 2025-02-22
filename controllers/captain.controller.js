const { validationResult } = require('express-validator');
const Captain = require('../models/captain.model.js');
const captainService = require('../services/captain.service.js');
const BlacklistToken = require('../models/blacklistTokens.mdoel.js');

// Controller functions


// Create new captain
module.exports.createCaptain = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(401).json({ error: error.array() });
        }
        const { fullname, email, password, vehicle } = req.body
        const exist = await Captain.findOne({ email });
        if (exist
            
        ) {
            throw new Error('User Already exist');
        }

        const hashPwd = await Captain.hashPassword(password)
        const newCaptain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPwd,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        });
        const token = newCaptain.generateAuthToken();
        res.cookie('token', token)
        res.status(201).json({ newCaptain, message: 'Captain create succefully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};