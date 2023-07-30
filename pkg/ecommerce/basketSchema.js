const mongoose = require("mongoose");
const Event = require("../event/eventSchema");

const basketSchema = new mongoose.Schema({
  amount: {
    type: Number,
    min: 1,
    max: 4,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  beholder: {
    type: String,
    required: [true, "User must have Identification"],
  },
});
const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
