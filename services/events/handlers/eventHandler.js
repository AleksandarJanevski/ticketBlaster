const Event = require('../../../pkg/event/eventSchema');
const { unlink } = require('../../../pkg/fsModules/pictureDelete')

exports.getAllStandUp = async (req, res) => {
    try {
        const events = await Event.find({ category: 'Stand-up Comedy' });
        events.sort((a, b) => { return a.date - b.date });
        res.status(200).json({ status: 'success', data: { events } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.getHero = async (req, res) => {
    try {
        const events = await Event.find();
        events.sort((a, b) => { return a.date - b.date });
        const hero = events[0]
        res.status(200).json({ status: 'success', data: { hero } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}

exports.getAllConcerts = async (req, res) => {
    try {
        const events = await Event.find({ category: 'Musical Concert' });
        events.sort((a, b) => { return a.date - b.date });
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
        console.log(req.body);

        for (let key in data) {
            if (!data[key]) {
                return res.status(400).send('please provide valid data for the event');
            }
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
            location: data.location
        });
        res.status(201).json({ status: 'success', data: { event } });
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
        if (data.picture && data.picture !== event.picture) {
            unlink(event.picture)
        }
        for (let key in data) {
            if (data[key] !== undefined && data[key] !== null) {
                event[key] = data[key]
            }
        }
        await event.save({ validateBeforeSave: true });
        res.status(200).json({ status: 'success', });
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
exports.search = async (req, res) => {
    try {
        const keyword = req.query.keyword
        // const sort = req.query.sort
        const events = await Event.find()
        let searchQuery = events.filter(element => element.details.toLowerCase().includes(keyword) || element.name.toLowerCase().includes(keyword));
        // searchQuery.sort((a, b) => {
        //     if (sort === 'ascending') {
        //         return a.date - b.date
        //     } else if (sort === 'descending') {
        //         return b.date - a.date
        //     }
        // });
        res.status(200).json({ status: 'success', data: { searchQuery } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}