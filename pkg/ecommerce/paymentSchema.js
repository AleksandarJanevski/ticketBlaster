const mongoose = require('mongoose');

const month = new Date().getMonth() + 1
const year = (new Date().getFullYear() % 100);
const max = year + 5
const expiration = new mongoose.Schema({
    month: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
    year: {
        type: Number,
        min: year,
        max: max,
        required: true
    },
});
expiration.pre('validate', async function (next) {
    if (this.month <= month && this.year === year) {
        return next(new Error('Card is out of date'));
    }
    next()
})

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