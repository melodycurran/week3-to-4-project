const data = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

// const Product = require('../models/schema.js');

exports.getAll = async (req, res) => {
    // #swagger.tags = ['Products']

        const result = await data.getDb().db().collection('products').find();
        result.toArray().then((product) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(product);
        });

};

exports.getOne = async (req, res) => {
    // #swagger.tags = ['Products']

        const prod_id = new ObjectId(req.params.id)

        const result = await data.getDb().db().collection('products').find({_id: prod_id});
        result.toArray().then((product) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(product[0]);
        });
};

exports.createProduct = async (req, res) => {
    // #swagger.tags = ['Products']
    
        const prod_id = new ObjectId(req.params.id);
        const product = {
            name: req.body.name,
            brand: req.body.brand,
            quantity: req.body.quantity,
            sku: req.body.sku,
            color: req.body.color,
            size: req.body.size,
            category: req.body.category
    
        }
        const response = await data.getDb().db().collection('products').insertOne(product);

        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error) || 'An error ocurred. Try again.'
        }
        
};

exports.updateProduct = async (req, res) => {
    //#swagger.tags = ['Products']

        const prod_id = new ObjectId(req.params.id);
        const product = {
            name: req.body.name,
            brand: req.body.brand,
            quantity: req.body.quantity,
            sku: req.body.sku,
            color: req.body.color,
            size: req.body.size,
            category: req.body.category
        }

        const response = await data.getDb().db().collection('products').replaceOne({_id: prod_id}, product);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error) || 'An error ocurred. Try again.'
        }
  
 
};

exports.deleteProduct = async (req, res) => {
    //#swagger.tags = ['Products']

        const prod_id = new ObjectId(req.params.id);

        const response = await data.getDb().db().collection('products').deleteOne({_id: prod_id});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error) || 'An error ocurred. Try again.'
        }

};