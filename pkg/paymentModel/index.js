const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Card holder name is required']
    },
    cardNo: {
        type: Number,
        required: [true, 'Card number is required']
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