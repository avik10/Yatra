const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        let connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to DB");
        return connect;
    } catch (error) {
        console.error("Error: ", error.message);
    }
}

module.exports = connectToDb;

