const express = require('express');
const db = require('../../pkg/database/index');
const api = express();
const auth = require('./handlers/authHandler');
const cookieParser = require('cookie-parser');//nepotrebno?

api.use(express.json());
api.use(cookieParser());
db.init()

api.get('/api/v1/auth', auth.cookieVerify);
api.post('/api/v1/auth/login', auth.login);
api.get('/api/v1/auth/admin', auth.protectAdmin, (req, res) => {
    res.status(200).json({ status: 'success' });
});
api.get('/api/v1/auth/logout', auth.protectRoute, auth.logout);
api.post('/api/v1/auth/forgotPassword', auth.forgotPassword);
api.post('/api/v1/auth/resetPassword/:token', auth.resetPassword);
api.get('/api/v1/auth/verify/:token', auth.verify);
api.post('/api/v1/auth/changePassword/:id', auth.protectRoute, auth.changePassword);

api.listen(process.env.AUTH, err => {
    if (err) return console.log(err);
    console.log(`Auth Service started on ` + process.env.AUTH);
})