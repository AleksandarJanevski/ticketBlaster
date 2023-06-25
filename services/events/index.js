const express = require('express');
const db = require('../../pkg/database/index');
const jwt = require('express-jwt');
const events = require('./handlers/eventHandler');
const upload = require('../upload/handlers/uploadHandler');
const cookieParser = require('cookie-parser');
const auth = require('../auth/handlers/authHandler')

const api = express();
api.use(cookieParser());
api.use(express.json());
db.init()

api.patch("/api/v1/events/:id", events.update)
api.get("/api/v1/events", events.search);
api.get("/api/v1/events/standUp", events.getAllStandUp);
api.get("/api/v1/events/concerts", events.getAllConcerts);
api.get("/api/v1/events/hero", events.getHero);
api.get("/api/v1/events/:id", events.getOne);

api.use(auth.protectAdmin);

api.post("/api/v1/events", events.create);

api.delete("/api/v1/events/:id", events.delete);



api.listen(process.env.EVENTS, err => {
    if (err) return console.log(err);
    console.log(`Events Service started on ` + process.env.EVENTS);
})