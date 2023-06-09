const express = require('express');
const db = require('./pkg/database/index');
const app = express()

db.init();

app.listen(process.env.PORT, err => {
    if (err) return console.log(err);
    console.log('Service Started');
})
