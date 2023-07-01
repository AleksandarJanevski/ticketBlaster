const Order = require('../../../pkg/ecommerce/orderSchema');

exports.create = async (req, res) => {
    try {
        const { amount, event, beholder } = req.body
        if (!amount || !event || !beholder) {
            return res.status(400).send('Purchase error');
        }
        await Order.create({
            event: event,
            amount: amount,
            beholder: beholder
        })
        res.status(201).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.get = async (req, res) => {
    try {
        console.log(req.params.id, req.cookies);
        const orders = await Order.find({ beholder: req.params.id }).populate('event');
        res.status(200).json({ status: 'success', data: { orders } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
} 