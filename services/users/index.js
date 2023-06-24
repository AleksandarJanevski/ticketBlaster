const express = require('express');
const db = require('../../pkg/database/index');
const jwt = require('express-jwt');
const user = require('./handlers/usersHandler');
const api = express();

api.use(express.json());
db.init();

api.post('/api/v1/users', user.create);

api.use(
    jwt.expressjwt({
        algorithms: ["HS256"],
        secret: process.env.JWT_SECRET,
    })
);

api.get('/api/v1/users', user.getAll);
api.route('/api/v1/users/:id').get(user.getOne).patch(user.update).delete(user.delete).put(user.role);

api.listen(process.env.USERS, err => {
    if (err) return console.log(err);
    console.log(`User Service started on ` + process.env.USERS);
})