const express = require('express');
const route = express.Router();
const products = require('../controllers/products.js');
const validation = require('../middleware/validate.js');

route.get('/', products.getAll);
route.get('/:id', products.getOne);
route.post('/', validation.createProduct,  products.createProduct);
route.put('/:id', validation.createProduct, products.updateProduct);
route.delete('/:id', products.deleteProduct);

module.exports = route;