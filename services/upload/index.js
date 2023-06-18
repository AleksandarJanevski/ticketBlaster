const express = require('express');
const db = require('../../pkg/database/index');
const jwt = require('express-jwt');
const upload = require('./handlers/uploadHandler')

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static('public'));

db.init()

api.post('/api/v1/upload/:destination', upload.uploadPicture, (req, res) => {
    res.status(200).json({ status: 'successfuly uploaded' });
});

api.listen(process.env.UPLOAD, err => {
    if (err) return console.log(err);
    console.log(`Upload Service started on ` + process.env.UPLOAD);
});


// Customizing Token Location
// A custom function for extracting the token from a request can be specified with the getToken option. This is useful if you need to pass the token through a query parameter or a cookie. You can throw an error in this function and it will be handled by express-jwt.

// app.use(
//   jwt({
//     secret: "hello world !",
//     algorithms: ["HS256"],
//     credentialsRequired: false,
//     getToken: function fromHeaderOrQuerystring(req) {
//       if (
//         req.headers.authorization &&
//         req.headers.authorization.split(" ")[0] === "Bearer"
//       ) {
//         return req.headers.authorization.split(" ")[1];
//       } else if (req.query && req.query.token) {
//         return req.query.token;
//       }
//       return null;
//     },
//   })
// );  dokumentacija za prevzemanje na cookies