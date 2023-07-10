const Basket = require('../../../pkg/ecommerce/basketSchema');

exports.addToBasket = async (req, res) => {
    try {
        const { event, amount } = req.body;
        const id = req.params.id
        const basketItem = await Basket.findOne({
            beholder: id,
            event: event
        });
        if (basketItem) {
            basketItem.amount += parseInt(amount)
            await basketItem.save();
        } else {
            await Basket.create({
                event: event,
                beholder: id,
                amount: amount
            });
        }
        res.status(201).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}

exports.getBasket = async (req, res) => {
    try {
        let basket = await Basket.find({ beholder: req.params.id }).populate('event');
        basket = basket.filter(element => new Date(element.event.date) >= new Date().setHours(0, 0, 0, 0) && element.event.tickets > 0)
        await Promise.all(basket.map(cart => cart.save()));
        res.status(200).json({ status: 'success', data: { basket } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}

exports.delete = async (req, res) => {
    try {
        await Basket.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'removed' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.deleteMany = async (req, res) => {
    try {
        const orders = req.body
        await Basket.deleteMany({ _id: { $in: orders } })
        res.status(204).json({ status: 'removed' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}