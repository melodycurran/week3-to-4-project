const express = require('express');
const route = express.Router();
const products = require('../controllers/products.js');
const validation = require('../middleware/validate.js');
const {isAuthenticated} = require('../middleware/authenticate.js');

route.get('/', products.getAll);
route.get('/:id', products.getOne);
route.post('/', isAuthenticated, validation.createProduct,  products.createProduct);
route.put('/:id', isAuthenticated, validation.createProduct, products.updateProduct);
route.delete('/:id', isAuthenticated, products.deleteProduct);

module.exports = route;