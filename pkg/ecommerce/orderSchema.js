const mongoose = require("mongoose");
const uuid = require("uuid");

const orderSchema = new mongoose.Schema({
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
    required: [true, "User must have Identification"],
    ref: "User",
  },
  purchaseNo: {
    type: String,
    default: function () {
      return uuid.v4();
    },
  },
  eventDate: {
    type: Date,
    required: [true, "Order must have date"],
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
