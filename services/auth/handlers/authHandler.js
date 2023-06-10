const User = require('../../../pkg/user/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../../mailer/nodemailer');

const cryptoToken = () => {
    return crypto.randomBytes(32).toString('hex');
}
const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
}
const jwtToken = (options) => {
    return jwt.sign(options, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
}
const cookie = (res, name, token) => {
    res.cookie(name, token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly: true
    });
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send('Invalid email or password');
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid email or password');
        const validatePassword = bcrypt.compareSync(password, user.password);
        if (!validatePassword) return res.status(400).send('Invalid email or password');
        const token = jwtToken({ id: user._id });
        cookie(res, 'jwt', token);
        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
// let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES
// });
// res.cookie('jwt', token, {
//     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
//     secure: false,
//     httpOnly: true
// });
exports.logout = async (req, res) => {
    try {
        cookie(res, 'jwt', 'sessionExpired');
        res.status(204).json({ status: 'signed out' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
const html = (link) => {
    return `<html lang="en">
    <head>
    <style>
    * {
      margin: 0;
      padding: 0;
    }
    </style>
    </head>
    <body>
      <h1 style="color: white; background-color: black; text-align: center">
        ticketblaster
      </h1>
      <span
        style="
          margin: 0 auto;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        "
        ><p style="text-align: center">
          Click the link below to reset your password. Link expires in 30 minutes
        </p>
        <br />
        <a href="${link}">
          <button
            style="
              background-color: #ff48ab;
              color: black;
              border-radius: 23px;
              margin: 0 auto;
              cursor: pointer;
              box-style:border-box;
              padding:5px;
            "
          >
            Reset Password
          </button>
        </a>
      </span>
    </body>
    </html>`
}
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('user not found');
        const resetToken = cryptoToken();
        const hashedToken = hashToken(resetToken);
        user.passwordResetToken = hashedToken;
        user.passwordResetExpire = Date.now() + 30 * 60 * 1000
        await user.save({ validateBeforeSave: false });
        const resetUrl = `${req.protocol}://localhost:3000/resetPassword/${resetToken}`
        await sendEmail({
            email: user.email,
            subject: 'Password Reset',
            html: html(resetUrl)
        });
        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.resetPassword = async (req, res) => {
    try {
        const { userToken } = req.params.token;
        if (!userToken) return res.status(401).send('permission denied');
        const hashedToken = hashToken(userToken);
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpire: { $gt: Date.now() }
        });
        if (!user) return res.status(404).send('Token is invalid, expired or user does not exist');
        const { newPassword, confirmPassword } = req.body;
        if (!newPassword || !confirmPassword && newPassword !== confirmPassword) {
            return res.status(400).send('passwords do not match');
        }
        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpire = undefined;
        await user.save();
        const token = jwtToken({ id: user._id });
        cookie(res, 'jwt', token);
        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.protectUser = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
exports.protectAdmin = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
}
// exports. = async (req, res) => {
//     try {

//     } catch (err) {
//         console.log(err);
//         return res.status(500).send('internal server error');
//     }
// }