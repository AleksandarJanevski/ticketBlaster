const express = require('express');
const db = require('../../pkg/database/index');
const jwt = require('express-jwt');
const api = express();

api.use(express.json());
db.init()
// api.use(
//     jwt.expressjwt({
//         algorithms: ["HS256"],
//         secret: process.env.JWT_SECRET,
//     })
// );
api.post('/api/v1/auth');
api.get('/api/v1/auth');
api.post('/api/v1/auth')
api.post('/api/v1/auth')
api.get('/api/v1/auth');

api.listen(process.env.AUTH, err => {
    if (err) return console.log(err);
    console.log(`Auth Service started on ` + process.env.AUTH);
})