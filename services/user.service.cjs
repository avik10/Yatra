const { User } = require('../models/user.model.cjs');


module.exports.createUser = async ({ firstName, lastName, email, password }) => {
    // try {
    console.log(User);

    if (!firstName || !email || !password) {
        throw new Error('All Fields are required');
    }
    const user = await new User.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    });
    return user;
    // } catch (error) {
    //     throw new Error('Error creating user: ' + error.message);
    // }
};
