const mongoose = require("mongoose");

let today = new Date().setHours(2, 0, 0, 0);

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Event must have name"],
  },
  category: {
    type: String,
    enum: ["Musical Concert", "Stand-up Comedy"],
    required: [true, "Event must have category"],
  },
  date: {
    type: Date,
    required: [true, "Event must have date"],
  },
  price: {
    type: Number,
    required: [true, "Event must have price"],
  },
  details: {
    type: String,
    required: [true, "Event must have details"],
  },
  relatedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  picture: {
    type: String,
    default: "default.png",
  },
  location: {
    type: String,
    required: [true, "Event must have location"],
  },
  tickets: {
    type: Number,
    max: 5000,
    min: 0,
    required: [true, "Event must have tickets"],
  },
});
eventSchema.pre("save", async function (next) {
  today = new Date(today);
  let check = this.date.toISOString();
  if (check.split("T")[1].startsWith("22")) {
    this.date = this.date.setHours(2, 0, 0, 0);
  }
  if (this.date < today) {
    return next(new Error("Date cannot be less than today"));
  }
  if (this.tickets < 0) {
    return next(new Error("Tickets are sold out"));
  }
  next();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
