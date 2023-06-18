const express = require('express');
const db = require('../../pkg/database/index');
const jwt = require('express-jwt');
const api = express();

api.use(express.json());
db.init()
api.use(
    jwt.expressjwt({
        algorithms: ["HS256"],
        secret: process.env.JWT_SECRET,
    })
);

api.listen(process.env.USERS, err => {
    if (err) return console.log(err);
    console.log(`User Service started on ` + process.env.USERS);
})