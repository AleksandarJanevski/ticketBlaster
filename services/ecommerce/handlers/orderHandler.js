const Order = require("../../../pkg/ecommerce/orderSchema");
const { mail } = require("../../../pkg/fsModules/fileReader");
const { sendEmail } = require("../../../pkg/mailer/nodemailer");
const Event = require("../../../pkg/event/eventSchema");
const User = require("../../../pkg/user/userSchema");

exports.createMany = async (req, res) => {
  try {
    const { decoded } = req;
    let orders = req.body;

    orders.forEach((element) => {
      if (!element.amount || !element.event || !element.eventDate) {
        return res.status(400).send("Purchase error");
      }
    });

    let events = await Event.find();
    events = events.filter((event) => new Date(event.date) > new Date());
    let array = [];
    orders.forEach((order) => {
      const event = events.find(
        (event) => event._id.toString() === order.event
      );
      if (event) {
        event.tickets -= order.amount;
        array.push(event);
        order.beholder = decoded.id;
      }
    });
    events = array;
    await Promise.all(events.map((event) => event.save()));
    const tickets = await Order.insertMany(orders).then((elements) =>
      Order.populate(elements, { path: "event" })
    );
    const user = await User.findById(decoded.id);
    const message = `Thank you for purchasing at ticket blaster, here is you purchase code: ${tickets
      .map((element) => element.purchaseNo)
      .join(", ")}`;
    const html = await mail("ticket", message);
    try {
      await sendEmail({
        email: user.email,
        subject: "Purchase Confirm",
        html: html,
      });
    } catch (err) {
      return console.log(err);
    }
    res.status(201).json({ status: "success", tickets });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
exports.get = async (req, res) => {
  try {
    const { decoded } = req;
    const orders = await Order.find({ beholder: decoded.id }).populate("event");
    res.status(200).json({ status: "success", data: { orders } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.getTicket = async (req, res) => {
  try {
    const order = await Order.findOne({ purchaseNo: req.params.purchase });
    if (!order) {
      throw Error("Internal server error");
    } else {
      const user = await User.findById(order.beholder);
      const event = await Event.findById(order.event);
      const ticket = {
        purchaseNo: req.params.purchase,
        beholder: user.fullName,
        eventName: event.name,
        eventTime: event.date,
        amount: order.amount,
        fee: `${order.amount * event.price} USD`,
        picture: event.picture,
        location: event.location,
      };
      res.render("ticket", { ticket });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
