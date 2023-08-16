const express = require("express");
const db = require("../../pkg/database/index");
const basket = require("./handlers/basketHandler");
const order = require("./handlers/orderHandler");
const purchase = require("./handlers/purchaseHandler");
const auth = require("../auth/handlers/authHandler");
const cookieParser = require("cookie-parser");

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static("public"));
api.use(cookieParser());
api.set("view engine", "ejs");
db.init();

api.get("/api/v1/ecommerce/ticket/:purchase", order.getTicket);
api.use(auth.protectRoute);
api.delete("/api/v1/ecommerce/basket", basket.deleteOne);
api.get("/api/v1/ecommerce/basket", basket.getBasket);
api.post("/api/v1/ecommerce/basket", basket.addToBasket);
api.delete("/api/v1/ecommerce/basket/removeMany", basket.removeMany);
api.post("/api/v1/ecommerce/order", order.createMany);
api.get("/api/v1/ecommerce/order", order.get);
api.post("/api/v1/ecommerce/payment", purchase.validate);

api.listen(process.env.ECOM, (err) => {
  if (err) return console.log(err);
  console.log(`Ecommerce Service started on ` + process.env.ECOM);
});
