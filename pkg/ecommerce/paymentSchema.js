const mongoose = require('mongoose');

const today = new Date().getFullYear() % 100;
const max = today + 5
const expiration = new mongoose.Schema({
    month: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
    year: {
        type: Number,
        min: today,
        max: max,
        required: true
    },
});

const paymentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Card holder name is required']
    },
    cardNo: {
        type: Number,
        required: [true, 'Card number is required'],
        min: [1000000000000000, 'Please enter a valid credit card'],
        max: [9007199254740991, 'Please enter a valid credit card'],
    },
    expire: {
        type: expiration,
        required: [true, 'Card expiration is required'],
    },
    pin: {
        type: Number,
        required: [true, 'Pin is required']
    }
});

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment