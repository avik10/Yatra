const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API}`);
        const location = response.data.results[0].geometry.location;
        return {
            ltd: location.lat,
            lng: location.lng
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {

    if (!origin || !destination) {
        res.status(400).json({ error: 'Origin and Destination are required' });
    }

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