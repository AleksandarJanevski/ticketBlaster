const express = require('express');
const db = require('./pkg/database/index');
const app = express()
const handler = require('./services/users/handlers/usersHandler')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.init();

app.route('/user').get(handler.getAll).post(handler.create)

app.listen(process.env.PORT, err => {
    if (err) return console.log(err);
    console.log('Service Started');
})
