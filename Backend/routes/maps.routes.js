const express = require('express');
const { query } = require('express-validator');
const { userMiddleware } = require('../middlewares/auth.middleware.js');
const { getCoordinate, getDistanceTime, getSugesition } = require('../controllers/maps.controller.js')


const Mapsrouter = express.Router();

// Route to get coordinates for a given address
Mapsrouter.get('/get-coordinates', [
    query('address').isLength({ min: 3 }).withMessage('Address must be at least 3 characters long'),
], userMiddleware, getCoordinate);

// Route to get distance and time a given address
Mapsrouter.get('/get-distance-time', [
    query('origin').isLength({ min: 3 }).withMessage('Origin is required'),
    query('destination').isLength({ min: 3 }).withMessage('Destination is required'),
], userMiddleware, getDistanceTime)


Mapsrouter.get('/get-suggesitions', [
    query('input').isLength({ min: 3 }).withMessage('Location should enter at least 3 charactes or more')
], userMiddleware, getSugesition)

module.exports = Mapsrouter;