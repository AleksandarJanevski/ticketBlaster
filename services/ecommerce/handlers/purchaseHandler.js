const Purchase = require('./../../../pkg/ecommerce/paymentSchema');

exports.validate = async (req, res) => {
    try {
        const payment = await Purchase.validate(req.body);
        if (!payment) {
            return res.status(400).send('Please provide accurate CC information');
        }
        res.status(200).json({ status: 'success', messsage: 'Payment Successful' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}