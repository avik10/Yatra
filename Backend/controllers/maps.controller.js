const mapsService = require('../services/maps.service.js');
const { validationResult } = require('express-validator');

module.exports.getCoordinate = async (req, res) => {
    try {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ error: 'Address is required' });
        }
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(401).json({ error: error.array() });
        }
        const coordinates = await mapsService.getAddressCoordinates(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error getting coordinates:', error);
        return res.status(404).json({ error: 'Coordinates Not found' });
    }
};

module.exports.getDistanceTime = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(401).json({ error: error.array() });
    }
    const { origin, destination } = req.query;
    const distanceTime = await mapsService.getDistanceTime(origin, destination);
    return res.status(200).json(distanceTime);
}

module.exports.getSugesition = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(401).json({ error: error.array() });
    }
    const { input } = req.query;
    const distanceTime = await mapsService.getSugesition(input);
    return res.status(200).json(distanceTime);
}
