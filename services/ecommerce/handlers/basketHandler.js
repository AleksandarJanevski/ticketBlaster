const Basket = require('../../../pkg/ecommerce/basketSchema');

exports.addToBasket = async (req, res) => {
    try {
        const { event, amount, beholder } = req.body;
        const basketItem = await Basket.findOne({
            ticket: ticket,
            beholder: beholder
        });
        if (basketItem) {
            basketItem.amount += amount
            await basketItem.save();
        } else {
            await Basket.create({
                event: event,
                beholder: beholder,
                amount: amount
            })
        }
        res.status(201).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}

exports.getBasket = async (req, res) => {
    try {
        const basket = await Basket.find({ beholder: req.params.id }).populate('ticket').populate('beholder');//?
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