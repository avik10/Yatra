const Captain = require('../models/captain.model.js');


module.exports.createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType }) => {
    try {
        if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
            throw new Error('All Fields are required');
        }
        const captain = Captain.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });
        return captain;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};
