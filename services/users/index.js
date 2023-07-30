const express = require("express");
const db = require("../../pkg/database/index");
const auth = require("../auth/handlers/authHandler");
const user = require("./handlers/usersHandler");
const jwt = require("express-jwt");

const api = express();
const cookieParser = require("cookie-parser");
api.use(express.json());
api.use(cookieParser());

db.init();

api.post("/api/v1/users", user.create);

api.use(
  jwt.expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    getToken: auth.getAuthToken,
  })
);

api.get("/api/v1/users/:id", user.getOne);
api.patch("/api/v1/users/:id", user.update);

api.use(auth.protectAdmin);

api.get("/api/v1/users", user.getAll);
api.post("/api/v1/users/role/:id", user.role); //patch?
api.delete("/api/v1/users/:id", user.delete);

api.listen(process.env.USERS, (err) => {
  if (err) return console.log(err);
  console.log(`User Service started on ` + process.env.USERS);
});
