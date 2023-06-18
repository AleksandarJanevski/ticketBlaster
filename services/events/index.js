const express = require('express');
const db = require('../../pkg/database/index');
const jwt = require('express-jwt');
const events = require('./handlers/eventHandler');

const api = express();

api.use(express.json());
db.init()

api.get("/api/v1/events/standUp", events.getAllStandUp);
api.get("/api/v1/events/concerts", events.getAllConcerts);
api.get("/api/v1/events/:id", events.getOne);
api.get("/api/v1/events", events.search);

api.use(
    jwt.expressjwt({
        algorithms: ["HS256"],
        secret: process.env.JWT_SECRET,
    })
);

api.post("/api/v1/events", events.create);
api.route("/api/v1/events/:id").patch(events.update).delete(events.delete);



api.listen(process.env.EVENTS, err => {
    if (err) return console.log(err);
    console.log(`Events Service started on ` + process.env.EVENTS);
})