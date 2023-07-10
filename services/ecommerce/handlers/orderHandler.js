const Order = require('../../../pkg/ecommerce/orderSchema');
const { mail } = require('../../../pkg/fsModules/fileReader');
const { sendEmail } = require('../../../pkg/mailer/nodemailer');
const Event = require('../../../pkg/event/eventSchema');

exports.createMany = async (req, res) => {
    try {
        const orders = req.body;
        orders.forEach(element => {
            if (!element.amount || !element.event || !element.beholder || !element.eventDate) {
                return res.status(400).send('Purchase error');
            }
        })
        let events = await Event.find();
        orders.forEach(order => {
            const event = events.find(event => event._id.toString() === order.event);
            if (event) {
                event.tickets -= order.amount;
            }
        });
        await Promise.all(events.map(event => event.save()));
        const tickets = await Order.insertMany(orders).then(elements => Order.populate(elements, { path: 'beholder' }));
        const message = `Thank you for purchasing at ticket blaster, here is you purchase code: ${tickets.map(element => element.purchaseNo).join(', ')}`
        const html = await mail('ticket', message,);
        try {
            await sendEmail({
                email: tickets[0].beholder.email,
                subject: 'Purchase Confirm',
                html: html
            })
        } catch (err) {
            return console.log(err);
        }
        res.status(201).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.get = async (req, res) => {
    try {
        const orders = await Order.find({ beholder: req.params.id }).populate('event');
        res.status(200).json({ status: 'success', data: { orders } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
} 