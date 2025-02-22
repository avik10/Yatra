const express = require('express');
const { createCaptain,  } = require('../controllers/captain.controller.js')
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware.js');

const CaptainRouter = express.Router();

CaptainRouter.post('/', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name Must be 3 characters or More'),
    body('password').isLength(6).withMessage('Password Must be 6 characters or More'),
    body('vehicle.vehicleType').notEmpty().withMessage('Vehicle type is required'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be a positive integer')
], createCaptain);


module.exports = CaptainRouter;