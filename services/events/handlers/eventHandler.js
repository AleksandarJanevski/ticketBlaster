const Event = require("../../../pkg/event/eventSchema");
const { unlink } = require("../../../pkg/fsModules/pictureDelete");

let today = new Date().setHours(2, 0, 0, 0);

exports.getAllStandUp = async (req, res) => {
  try {
    let events = await Event.find({
      category: "Stand-up Comedy",
      date: { $gte: new Date(today) },
    }).sort({
      date: 1,
    });
    res.status(200).json({ status: "success", data: { events } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.getHero = async (req, res) => {
  try {
    let events = await Event.find({ date: { $gte: new Date(today) } }).sort({
      date: 1,
    });
    const hero = events[0];
    res.status(200).json({ status: "success", data: { hero } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.getAllConcerts = async (req, res) => {
  try {
    let events = await Event.find({
      category: "Musical Concert",
      date: { $gte: new Date(today) },
    }).sort({
      date: 1,
    });
    res.status(200).json({ status: "success", data: { events } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
exports.getAll = async (req, res) => {
  try {
    let events = await Event.find({
      date: { $gte: new Date(today) },
    }).sort({
      date: 1,
    });
    res.status(200).json({ status: "success", data: { events } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.getOne = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("relatedEvents");
    res.status(200).json({ status: "success", data: { event } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.create = async (req, res) => {
  try {
    const { decoded } = req;
    if (decoded.role !== "admin") {
      return res.status(401).send("Unauthorized");
    }
    let data = req.body;
    if (
      !data.name ||
      !data.category ||
      !data.date ||
      !data.price ||
      !data.details ||
      !data.tickets ||
      !data.location
    ) {
      return res.status(400).send("Please provide valid data for the event");
    }
    if (data.price < 1 || data.tickets < 1) {
      return res.status(400).send("Please provide valid data for the event");
    }
    const event = await Event.create({
      name: data.name,
      category: data.category,
      date: data.date,
      price: data.price,
      details: data.details,
      relatedEvents: data.relatedEvents,
      picture: data.picture,
      tickets: data.tickets,
      location: data.location,
    });
    res.status(201).json({ status: "success", data: { event } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
exports.createMany = async (req, res) => {
  try {
    const { decoded } = req;
    if (decoded.role !== "admin") {
      return res.status(401).send("Unauthorized");
    }
    const data = req.body;
    for (let key in data) {
      if (!data[key] && key !== "picture") {
        return res.status(400).send("please provide valid data for the event");
      }
    }
    await Event.insertMany(data);
    res.status(201).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
exports.update = async (req, res) => {
  try {
    const { decoded } = req;
    if (decoded.role !== "admin") {
      return res.status(401).send("Unauthorized");
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send("event not found");
    }
    let data = req.body;
    if (data.price < 0 || data.tickets < 0) {
      return res.status(400).send("Please provide valid data for the event");
    }
    if (data.picture && data.picture !== event.picture) {
      unlink(event.picture);
    }
    for (let key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        event[key] = data[key];
      }
    }
    await event.save({ validateBeforeSave: true });
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
exports.delete = async (req, res) => {
  try {
    const { decoded } = req;
    if (decoded.role !== "admin") {
      return res.status(401).send("Unauthorized");
    }
    const event = await Event.findById(req.params.id);
    if (event && event.picture !== "default.png") {
      unlink(event.picture);
    }
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "removed" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
// exports.search = async (req, res) => {
//   try {
//     const keyword = req.params.keyword.toLowerCase();
//     const events = await Event.find();
//     let searchQuery = events.filter(
//       (element) =>
//         element.details.toLowerCase().includes(keyword) ||
//         element.name.toLowerCase().includes(keyword) ||
//         element.location.toLowerCase().includes(keyword)
//     );
//     res.status(200).json({ status: "success", data: { searchQuery } });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("internal server error");
//   }
// };
