const mongoose = require('mongoose');
const uuid = require('uuid');

const purchaseId = uuid.v4();

const orderSchema = new mongoose.Schema({
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
    },
    purchaseNo: purchaseId
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
