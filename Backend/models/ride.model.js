const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rideSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancel'],
        default: 'pending'
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: Number,
        required: true,
        select: false
    }
}, {
    timestamps: true
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;