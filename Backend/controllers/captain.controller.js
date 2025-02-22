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

// Login
module.exports.loginCaptain = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(401).json({ error: error.array() });
        }

        const { email, password } = req.body
        const captain = await Captain.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ message: 'Invalid Email or password' })
        }
        const isPwdMatch = captain.comparePassword(password)
        if (!isPwdMatch) {
            return res.status(401).json({ message: 'Invalid Email or password' })
        }
        const token = captain.generateAuthToken();
        res.cookie('token', token, {
            httpOnly: true,  // Prevents client-side JavaScript access
            secure: true,    // Ensures cookies are only sent over HTTPS
            maxAge: 3600000  // Cookie expires in 1 hour (milliseconds)
        });
        return res.status(200).json({ token, captain, message: 'Login succefully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.profileCaptain = async (req, res) => {
    try {
        return res.status(200).json({ Captain: req.Captain })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports.captainLogout = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '') || req.cookies.token;
    await BlacklistToken.create({ token })
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logut Successfully' })
};
