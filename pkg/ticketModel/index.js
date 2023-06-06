const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, 'Event must have name']
    },
    category: {
        type: String,
        enum: ['Musical Concert', 'Stand-up Comedy'],
        required: [true, 'Event must have category']
    },
    date: {
        type: Date,
        required: [true, 'Event must have date']
    },
    price: {
        type: Number,
        required: [true, 'Event must have price']
    },
    details: {
        type: String,
        required: [true, 'Event must have details']
    },
    relatedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tickets'
    }]
});

const tickets = mongoose.model('tickets', ticketSchema)

module.exports = tickets