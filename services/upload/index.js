const express = require("express");
const db = require("../../pkg/database/index");
const upload = require("./handlers/uploadHandler");
const jwt = require("express-jwt");
const auth = require("../auth/handlers/authHandler");

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static("public"));

db.init();

function getCookie(req) {
  if (req && req.headers.cookie) {
    return req.headers.cookie.slice(4);
  }
  return null;
}

api.use(
  jwt.expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    getToken: auth.getCookie,
  })
);
api.post("/api/v1/upload/:destination", upload.uploadPicture, (req, res) => {
  const filename = req.file.filename;
  res.json({ filename });
});

api.listen(process.env.UPLOAD, (err) => {
  if (err) return console.log(err);
  console.log(`Upload Service started on ` + process.env.UPLOAD);
});
