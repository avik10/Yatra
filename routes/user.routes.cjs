const express = require('express');
const { createUser, loginUser } = require('../controllers/user.controller.js')
const { body } = require('express-validator');

const UserRouter = express.Router();


// Create a new user
UserRouter.post('/', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name Must be 3 characters or More'),
    body('password').isLength(6).withMessage('Password Must be 6 characters or More'),
], createUser);
// Create a new user
UserRouter.get('/', [
   ,
], createUser);


UserRouter.get('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength(6).withMessage('Password Must be 6 characters or More'),
], loginUser);

// Update user by ID
// UserRouter.put('/:id', userController.updateUser);

// Delete user by ID
// UserRouter.delete('/:id', userController.deleteUser);

module.exports = UserRouter;