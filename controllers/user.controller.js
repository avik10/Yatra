const { validationResult } = require('express-validator');
const { User } = require('../models/user.model.js');
const { userModel } = require('../models/user.model.js');
const userService = require('../services/user.service.js');

// Controller functions


// Create new user
module.exports.createUser = async (req, res) => {
    const user = new User(req.body);

    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(401).json({ error: error.array() });
        }

        const { fullName, email, password } = req.body
        // const hashPwd = userModel.hashPassword(password)
        const newUser = await userService.createUser({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: password
        })
        const token = User.generateAuthToken();

        res.status(201).json({ token, newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Get user by ID
module.exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update user
module.exports.updateUser = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(401).json({ error: error.array() });
        }

        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete user
module.exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



