const User = require('../../../pkg/user/userSchema');
const Event = require('../../../pkg/event/eventSchema');

exports.addToBasket = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.getBasket = async (req, res) => {
    try {
        const basket = await User.findById().populate('basket');
        res.status(200).json({ status: 'success', data: { basket } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.buyTicket = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}