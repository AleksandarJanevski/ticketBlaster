const express = require('express');
const proxy = require('express-http-proxy');
const db = require('../../pkg/database/index')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const api = express();
api.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
api.use(cookieParser());
api.use(express.static('public'))
api.use(morgan('dev'));

const authProxy = proxy(`http://localhost:${process.env.AUTH}`, {
    proxyReqPathResolver: (req) => {
        return `/api/v1/auth${req.url}`
    }
})
const ecommerceProxy = proxy(`http://localhost:${process.env.ECOM}`, {
    proxyReqPathResolver: (req) => {
        return `/api/v1/ecommerce${req.url}`
    }
})
const eventsProxy = proxy(`http://localhost:${process.env.EVENTS}`, {
    proxyReqPathResolver: (req) => {
        return `/api/v1/events${req.url}`
    }
})
const uploadProxy = proxy(`http://localhost:${process.env.UPLOAD}`, {
    proxyReqPathResolver: (req) => {
        return `/api/v1/upload${req.url}`
    }
})
const usersProxy = proxy(`http://localhost:${process.env.USERS}`, {
    proxyReqPathResolver: (req) => {
        return `/api/v1/users${req.url}`
    }
})
api.use('/api/v1/auth', authProxy);
api.use('/api/v1/events', eventsProxy);
api.use('/api/v1/upload', uploadProxy);
api.use('/api/v1/ecommerce', ecommerceProxy);
api.use('/api/v1/users', usersProxy);

api.listen(process.env.PROXY, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Proxy Service Started on port ' + process.env.PROXY);
})