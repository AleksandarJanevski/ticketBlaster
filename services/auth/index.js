const express = require("express");
const db = require("../../pkg/database/index");
const api = express();
const auth = require("./handlers/authHandler");
const cookieParser = require("cookie-parser");

api.use(express.json());
api.use(cookieParser());
db.init();

api.post("/api/v1/auth/login", auth.login);
api.post("/api/v1/auth/forgotPassword", auth.forgotPassword);
api.patch("/api/v1/auth/resetPassword/:token", auth.resetPassword);
api.get("/api/v1/auth/verify/:token", auth.verify);

api.use(auth.protectRoute);

api.get("/api/v1/auth/logout", auth.logout);

api.listen(process.env.AUTH, (err) => {
  if (err) return console.log(err);
  console.log(`Auth Service started on ` + process.env.AUTH);
});
