const express = require('express');
const db = require('../../pkg/database/index');
const jwt = require('express-jwt');
const user = require('./handlers/usersHandler');
const api = express();
const cookieParser = require('cookie-parser')
api.use(express.json());
api.use(cookieParser())
db.init();

api.post('/api/v1/users', user.create);
api.get('/api/v1/users', user.getAll);
api.route('/api/v1/users/:id').get(user.getOne).patch(user.update).delete(user.delete).put(user.role);

api.listen(process.env.USERS, err => {
    if (err) return console.log(err);
    console.log(`User Service started on ` + process.env.USERS);
})