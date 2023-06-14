const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    amount:{
        type:Number,
        //default?
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    }
});

const Basket = mongoose.model('basket',basketSchema);

module.exports = Basket;
