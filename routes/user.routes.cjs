const express = require('express');
const { createUser } = require('../controllers/user.controller.js')
const { body } = require('express-validator');

const UserRouter = express.Router();

// Get all users
// UserRouter.get('/', userController.getAllUsers);

// Get user by ID
// UserRouter.get('/:id', userController.getUserById);

// Create a new user
UserRouter.post('/', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name Must be 3 characters or More'),
    body('password').isLength(6).withMessage('Password Must be 6 characters or More'),
], createUser);

// Update user by ID
// UserRouter.put('/:id', userController.updateUser);

// Delete user by ID
// UserRouter.delete('/:id', userController.deleteUser);

module.exports = UserRouter;