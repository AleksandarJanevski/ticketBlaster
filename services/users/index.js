const express = require('express');
const db = require('../../pkg/database/index');
const auth = require('../auth/handlers/authHandler')
const user = require('./handlers/usersHandler');

const api = express();
const cookieParser = require('cookie-parser')
api.use(express.json());
api.use(cookieParser())
db.init();

api.post('/api/v1/users', user.create);
api.get('/api/v1/users/:id', user.getOne)
api.use(auth.protectAdmin);
api.get('/api/v1/users', user.getAll);
api.post('/api/v1/users/role/:id', auth.protectAdmin, user.role);
api.route('/api/v1/users/:id').patch(user.update).delete(user.delete)


api.listen(process.env.USERS, err => {
    if (err) return console.log(err);
    console.log(`User Service started on ` + process.env.USERS);
})