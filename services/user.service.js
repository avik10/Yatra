const userModel = require('../models/user.model.js');


module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    try {
        if (!firstname || !email || !password) {
            throw new Error('All Fields are required');
        }
        const exist = userModel.findOne({ email: email })
        if (exist) {
            throw new Error('User Already exist');
        }
        const user = userModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        });
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};
