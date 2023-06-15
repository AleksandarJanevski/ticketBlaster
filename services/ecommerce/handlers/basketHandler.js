const User = require('../../../pkg/user/userSchema');

exports.addToBasket = async (req, res) => {
    try {
        const {ticketId,amount} = req.body;
        const user = await User.findById(req.params.id);
       
        const existingEvent = user.basket.findIndex(element => element.ticket === ticketId);
        if(existingEvent){
            user.basket[existingEvent].amount+=amount;
        }else{
            user.basket.push({
                ticket:ticketId,
                amount:amount
            });
        }
        await user.save();
        res.status(201).json({status:'success'});
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

exports.delete = async (req, res) => {
    try {
        const {ticketId} = req.body;
        const user = await User.findById(req.params.id);
        const array = user.basket.filter(element => element.ticket !==  ticketId);
        user.basket = array;
        await user.save();
        res.status(200).json({status:'success'});
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}