const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
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
        ref: 'Event'
    }],
    picture: {
        type: String,
        default: 'default.png'
    },
    tickets: {
        type: Number,
        default: 5
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;