const express = require('express');
const { body, query } = require('express-validator');
const { userMiddleware } = require('../middlewares/auth.middleware.js');
const { createRideController, getFareController } = require('../controllers/ride.controller.js');
const Riderouter = express.Router();

Riderouter.post('/create', [
    body('pickup').notEmpty().withMessage('Pickup is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
    body('vehicleType').isIn(['toto', 'rickshaw', 'auto']).withMessage('Invalid vehicle types'),
], userMiddleware, createRideController)


Riderouter.get('/get-fare', [
    query('pickup').notEmpty().withMessage('Pickup is required'),
    query('destination').notEmpty().withMessage('Destination is required'),
], userMiddleware, getFareController);


module.exports = Riderouter;