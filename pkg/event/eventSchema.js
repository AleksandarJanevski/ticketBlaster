const mongoose = require('mongoose');

const today = new Date();



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
    location: {
        type: String,
        required: [true, 'Event must have location']
    },
    tickets: {
        type: Number,
        default: 5,
        max: 5000,
        min: 0
    }
});
eventSchema.pre('save', async function (next) {
    this.date.setHours(this.date.getHours() + 2);
    if (this.date < today) {
        return next(new Error('Date cannot be less than today'));
    }
    next();
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;