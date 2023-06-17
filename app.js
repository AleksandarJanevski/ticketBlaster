const express = require('express');
const db = require('./pkg/database/index');
const app = express()
const handler = require('./services/users/handlers/usersHandler')
const event = require('./services/events/handlers/eventHandler');
const auth = require('./services/auth/handlers/authHandler');
const basket = require('./services/ecommerce/handlers/basketHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.init();

app.route('/user').get(handler.getAll).post(handler.create)
app.get('/verify/:token', auth.verify);

///////////////////// EVENT ////////
app.get('/concerts', event.getAllConcerts);
app.get('/standUp', event.getAllStandUp);
app.route('/event').post(event.create);
app.route('/event/:id').get(event.getOne).patch(event.update).delete(event.delete);
app.post('/events', event.createMany);
app.get('/event', event.search);

app.listen(process.env.PORT, err => {
    if (err) return console.log(err);
    console.log('Service Started');
})
