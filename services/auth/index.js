const express = require('express');
const db = require('../../pkg/database/index');
const jwt = require('express-jwt');
const api = express();
const auth = require('./handlers/authHandler');
const cookieParser = require('cookie-parser');//nepotrebno?

api.use(express.json());
api.use(cookieParser());
db.init()

api.post('/api/v1/auth/login', auth.login);
api.post('/api/v1/auth/forgotPassword', auth.forgotPassword);
api.post('/api/v1/auth/resetPassword/:token', auth.resetPassword);
api.get('/api/v1/auth/admin', auth.protectAdmin);
api.get('/api/v1/auth/verify/:token', auth.verify);

api.use(
    jwt.expressjwt({
        algorithms: ["HS256"],
        secret: process.env.JWT_SECRET,
    })
);
api.post('/api/v1/auth/changePassword', auth.changePassword);
api.get('/api/v1/auth/logout', auth.logout);

api.listen(process.env.AUTH, err => {
    if (err) return console.log(err);
    console.log(`Auth Service started on ` + process.env.AUTH);
})