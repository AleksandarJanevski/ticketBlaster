const express = require('express');
const db = require('../../pkg/database/index');
const upload = require('./handlers/uploadHandler');

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static('public'));

db.init()

api.post('/api/v1/upload/:destination', upload.uploadPicture, (req, res) => {
    const filename = req.file.filename;
    res.json({ filename })
});

api.listen(process.env.UPLOAD, err => {
    if (err) return console.log(err);
    console.log(`Upload Service started on ` + process.env.UPLOAD);
});
