const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    amount: {
        type: Number,
        //default?
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    },
    beholder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;
