const mongoose = require('mongoose');

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
        type: Date,
        required: [true, 'Card expiration is required']
    },
    pin: {
        type: Number,
        required: [true, 'Pin is required']
    }
});

const payment = mongoose.model('payment', paymentSchema)

module.exports = payment