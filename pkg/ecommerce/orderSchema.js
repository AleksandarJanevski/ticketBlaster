const mongoose = require('mongoose');
const uuid = require('uuid');

const orderSchema = new mongoose.Schema({
    amount: {
        type: Number,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    beholder: {
        type: String,
        required: [true, 'User must have Identification']
    },
    purchaseNo: {
        type: String,
        default: function () {
            return uuid.v4();
        }
    },
    eventDate: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
