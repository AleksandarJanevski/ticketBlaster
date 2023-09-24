const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema({
  amount: {
    type: Number,
    min: 1,
    max: 4,
    required: [true, "Must have amount of tickets"],
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "Must have event identification"],
  },
  beholder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User must have Identification"],
  },
});
const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
