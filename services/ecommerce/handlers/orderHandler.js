const Order = require('../../../pkg/ecommerce/orderSchema');
const { mail } = require('../../../pkg/fsModules/fileReader');
const { sendEmail } = require('../../../pkg/mailer/nodemailer');
const User = require('../../../pkg/user/userSchema');
// exports.create = async (req, res) => {
//     try {
//         const { amount, event, beholder } = req.body
//         if (!amount || !event || !beholder) {
//             return res.status(400).send('Purchase error');
//         }
//         await Order.create({
//             event: event,
//             amount: amount,
//             beholder: beholder
//         })
//         res.status(201).json({ status: 'success' });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).send('internal server error');
//     }
// }
exports.createMany = async (req, res) => {
    try {
        const orders = req.body;
        orders.forEach(element => {
            if (!element.amount || !element.event || !element.beholder || !element.eventDate) {
                return res.status(400).send('Purchase error');
            }
        })
        const tickets = await Order.insertMany(orders);
        const user = await User.findById(orders[0].beholder);
        const message = `Thank you for purchasing at ticket blaster, here is you purchase code: ${tickets.map(element => { return (element.purchaseNo, ' ') })}`
        const html = await mail('ticket', message,);
        try {
            await sendEmail({
                email: user.email,
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