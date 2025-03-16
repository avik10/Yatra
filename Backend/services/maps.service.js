const axios = require('axios');
const Captain = require('../models/captain.model');


module.exports.getAddressCoordinates = async (address) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API}`);
        const location = response.data.results[0].geometry.location;
        console.log(location);
        
        return {
            lat: location.lat,
            lng: location.lng
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error('Origin and Destination are required');
    }
    console.log(origin, destination);

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API}`);
        const element = response.data.rows[0].elements[0];
        if (element.status === 'OK') {
            if (!element.distance || !element.duration) {
                throw new Error('Unable to find routes');
            }
            return {
                distance: element.distance.text,
                duration: element.duration.text
            };
        } else {
            throw new Error('Unable to find the distance and time');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

}


module.exports.getSugesition = async (input) => {

    if (!input) {
        res.status(400).json({ error: 'Input are required' });
    }
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API}`);
        const predictions = response.data.predictions;
        return predictions.map(prediction => ({
            description: prediction.description,
            place_id: prediction.place_id
        }));
    } catch (error) {
        console.log(error);
        throw error;
    }


}

module.exports.getCaptainInTheRadius = async (lat, lng, radius) => {
    if (!lat || !lng || !radius) {
        throw new Error('Latitude, Longitude, and Radius are required');
    }
    try {
        const radiusInRadians = radius / 6378.1;
        const captains = await Captain.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, lat], radiusInRadians]
                }
            },
            // status: 'active'
        });
        return captains;
    } catch (error) {
        console.log(error);
        throw error;
    }
}