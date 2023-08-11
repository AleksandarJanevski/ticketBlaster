const Basket = require("../../../pkg/ecommerce/basketSchema");
const Event = require("../../../pkg/event/eventSchema");

exports.addToBasket = async (req, res) => {
  try {
    const { decoded } = req;
    const { event, amount } = req.body;
    const basketItem = await Basket.findOne({
      beholder: decoded.id,
      event: event,
    });
    const basketEvent = await Event.findById(event);
    if (basketItem) {
      basketItem.amount += parseInt(amount);
      if (basketItem.amount > 4 || basketEvent.tickets < basketItem.amount) {
        return res.status(400).send("Exceeded maximum number of tickets");
      }
      await basketItem.save();
    } else {
      await Basket.create({
        event: event,
        beholder: decoded.id,
        amount: amount,
      });
    }
    res.status(201).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.getBasket = async (req, res) => {
  try {
    const { decoded } = req;
    let basket = await Basket.find({ beholder: decoded.id }).populate("event");
    if (basket.length === 0) {
      res.status(200);
    }
    basket = basket.filter(
      (element) =>
        new Date(element.event.date) >= new Date().setHours(0, 0, 0, 0) &&
        element.event.tickets > 0
    );
    await Promise.all(basket.map((cart) => cart.save()));
    res.status(200).json({ status: "success", data: { basket } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

// exports.delete = async (req, res) => {
//   try {
//     await Basket.findByIdAndDelete(req.params.id);
//     res.status(204).json({ status: "removed" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("internal server error");
//   }
// };
exports.deleteOne = async (req, res) => {
  try {
    const { decoded } = req;
    const { event } = req.body;
    await Basket.findOneAndRemove({
      event: event,
      beholder: decoded.id,
    });
    res.status(204).json({ status: "removed" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
// exports.deleteMany = async (req, res) => {
//   try {
//     const orders = req.body;
//     await Basket.deleteMany({ _id: { $in: orders } });
//     res.status(204).json({ status: "removed" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("internal server error");
//   }
// };
exports.removeMany = async (req, res) => {
  try {
    const { decoded } = req;
    const { events } = req.body;
    await Basket.deleteMany({ event: { $in: events }, beholder: decoded.id });
    res.status(204).json({ status: "removed" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
