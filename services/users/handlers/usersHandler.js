const User = require('../../../pkg/user/userSchema');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../../mailer/nodemailer')
const crypto = require('crypto');

const cryptoToken = () => {
    return crypto.randomBytes(32).toString('hex')
}
const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
}

exports.create = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        if (!fullName || !email || !password) {
            return res.status(400).send('Bad request, please provide the needed information')
        }
        const user = await User.create({
            fullName: fullName,
            email: email,
            password: password
        })
        const verifyToken = cryptoToken()
        const hashedToken = hashToken(verifyToken)
        const verifyUrl = `${req.protocol}://${req.get('host')}/api/v1/verify/${hashedToken}`
        try {
            await sendEmail({
                email: user.email,
                subject: 'Email Verification',
                link: verifyUrl
            })
        } catch (err) {
            return console.log(err);
        }
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            secure: false,
            httpOnly: true
        })
        res.status(201).json({ status: 'success' })
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.getAll = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ status: 'success', data: { users } })
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.getOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({ status: 'success', data: { user } })
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.update = async (req, res) => {
    try {
        if (req.file) {
            req.body.profilePicture = req.file.filename
        }
        const user = await User.findById(req.params.id);
        if (user.profilePicture && user.profilePicture !== req.body.profilePicture) {
            //delete picture fs module
        }
        const updateData = req.body
        for (let key in updateData) {
            if (updateData[key]) {
                user[key] = updateData[key]
            }
        }
        await user.save({ validateBeforeSave: true });
        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.delete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(204).json({ status: 'success' })
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}