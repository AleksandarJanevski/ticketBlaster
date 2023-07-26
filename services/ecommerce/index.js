const express = require("express");
const db = require("../../pkg/database/index");
const basket = require("./handlers/basketHandler");
const order = require("./handlers/orderHandler");
const purchase = require("./handlers/purchaseHandler");
const auth = require("../auth/handlers/authHandler");
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cookieParser());
db.init();

api.use(
  jwt.expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    getToken: auth.getCookie,
  })
);
api.post("/api/v1/ecommerce/orderMany", order.createMany);
api.get("/api/v1/ecommerce/basket/:id", basket.getBasket);
api.post("/api/v1/ecommerce/basket/:id", basket.addToBasket);
api.delete("/api/v1/ecommerce/basket/:id", basket.delete);
api.delete("/api/v1/ecommerce/deleteMany", basket.deleteMany);
api.get("/api/v1/ecommerce/order/:id", order.get);
api.post("/api/v1/ecommerce/payment", purchase.validate);

api.listen(process.env.ECOM, (err) => {
  if (err) return console.log(err);
  console.log(`Ecommerce Service started on ` + process.env.ECOM);
});
