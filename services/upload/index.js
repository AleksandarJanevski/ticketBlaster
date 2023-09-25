const express = require("express");
const db = require("../../pkg/database/index");
const upload = require("./handlers/uploadHandler");
const auth = require("../auth/handlers/authHandler");
const cookieParser = require("cookie-parser");

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static("public"));
api.use(cookieParser());

db.init();

api.use(auth.protectRoute);
api.post(
  "/api/v1/upload/:destination",
  upload.adminFilter,
  upload.uploadPicture,
  (req, res) => {
    const filename = req.file.filename;
    res.json({ filename });
  }
);

api.listen(process.env.UPLOAD, (err) => {
  if (err) return console.log(err);
  console.log(`Upload Service started on ` + process.env.UPLOAD);
});
