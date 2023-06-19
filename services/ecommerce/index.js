const express = require('express');
const db = require('../../pkg/database/index');
const jwt = require('express-jwt');
const basket = require('./handlers/basketHandler');
const order = require('./handlers/orderHandler');
const purchase = require('./handlers/purchaseHandler');

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
db.init()

api.use(
    jwt.expressjwt({
        algorithms: ["HS256"],
        secret: process.env.JWT_SECRET,
    })
);
api.get('/api/v1/ecommerce/basket/:id', basket.getBasket);
api.post('/api/v1/ecommerce/basket', basket.addToBasket);
api.delete('/api/v1/ecommerce/basket/:id', basket.delete);
api.get('/api/v1/ecommerce/order/:id', order.get);
api.post('/api/v1/ecommerce/order', order.create);
api.post('/api/v1/ecommerce/payment', purchase.validate);

api.listen(process.env.ECOM, err => {
    if (err) return console.log(err);
    console.log(`Ecommerce Service started on ` + process.env.ECOM);
})