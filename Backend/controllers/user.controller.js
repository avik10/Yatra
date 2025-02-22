const { validationResult } = require('express-validator');
const userModel = require('../models/user.model.js');
const userService = require('../services/user.service.js');
const BlacklistToken = require('../models/blacklistTokens.mdoel.js');

// Controller functions


// Create new user
module.exports.createUser = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(401).json({ error: error.array() });
        }
        const { fullname, email, password } = req.body
        const User = await userModel.findOne({ email });
        if (User) {
            throw new Error('User Already exist');
        }

        const hashPwd = await userModel.hashPassword(password)
        const newUser = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPwd
        })
        const token = newUser.generateAuthToken();
        res.cookie('token', token)
        res.status(201).json({ newUser, message: 'Account create succefully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login
module.exports.loginUser = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(401).json({ error: error.array() });
        }

        const { email, password } = req.body
        const User = await userModel.findOne({ email }, { 'fullname.firstname': 1, 'fullname.lastname': 1, }).select('+password');
        if (!User) {
            return res.status(401).json({ message: 'Invalid Email or password' })
        }
        const isPwdMatch = User.comparePassword(password)
        if (!isPwdMatch) {
            return res.status(401).json({ message: 'Invalid Email or password' })
        }
        const token = User.generateAuthToken();
        res.cookie('token', token, { 
            httpOnly: true,  // Prevents client-side JavaScript access
            secure: true,    // Ensures cookies are only sent over HTTPS
            maxAge: 3600000  // Cookie expires in 1 hour (milliseconds)
        });
        return res.status(200).json({ token, message: 'Login succefully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// user profile
module.exports.getUserProfile = (req, res) => {
    return res.status(200).json({ user: req.User })
}

// logout
module.exports.logout = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '') || req.cookies.token;
    await BlacklistToken.create({ token })
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logut Successfully' })
}


// Get user by ID
// module.exports.getUserById = async (req, res) => {
//     try {
//         const user = await userService.getUserById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Update user
// module.exports.updateUser = async (req, res) => {
//     try {
//         const error = validationResult(req);
//         if (!error.isEmpty()) {
//             return res.status(401).json({ error: error.array() });
//         }

//         const updatedUser = await userService.updateUser(req.params.id, req.body);
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete user
// module.exports.deleteUser = async (req, res) => {
//     try {
//         const deletedUser = await userService.deleteUser(req.params.id);
//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };



