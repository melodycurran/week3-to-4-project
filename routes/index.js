const route = require('express').Router();
const product = require('./products');

route.use('/products', product);

route.use('/', require('./swagger'));

module.exports = route;