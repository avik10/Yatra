import mongoose from 'mongoose';

const connectToDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        let connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to DB");
        return connect;
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

export default connectToDb;

