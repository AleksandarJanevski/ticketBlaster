const Event = require('../../../pkg/event/eventSchema');

exports.getAllStandUp = async (req, res) => {
    try {
        const events = await Event.find({ category: 'Stand-up Comedy' });
        res.status(200).json({ status: 'success', data: { events } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}

exports.getAllConcerts = async (req, res) => {
    try {
        const events = await Event.find({ category: 'Musical Concert' });
        res.status(200).json({ status: 'success', data: { events } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}

exports.getOne = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json({ status: 'success', data: { event } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}

exports.create = async (req, res) => {
    try {
        let data = req.body;
        if (req.file) {
            data.picture = req.file.filename
        }
        for (let key in data) {
            if (!data[key]) {
                return res.status(400).send('please provide valid data for the event');
            }
        }
        await Event.create({
            name: data.name,
            category: data.category,
            date: data.date,
            price: data.price,
            details: data.details,
            relatedEvents: data.relatedEvents,
            picture: data.picture,
            ticket: data.tickets
        });
        res.status(201).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.createMany = async (req, res) => {
    try {
        const data = req.body;
        for (let key in data) {
            if (!data[key] && key !== 'picture') {
                return res.status(400).send('please provide valid data for the event');
            }
        }
        await Event.insertMany(data);
        res.status(201).json({ status: "success" });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.update = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            res.status(404).send('event not found');
        }
        let data = req.body;
        if (req.file) {
            data.picture = req.file.filename;
        }
        for (let key in data) {
            if (data[key] !== undefined && data[key] !== null) {
                event[key] = data[key]
            }
        }
        await event.save({ validateBeforeSave: true });
        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.delete = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}