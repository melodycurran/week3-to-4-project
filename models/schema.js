const mongoose = require('mongoose');

const products = new mongoose.Schema(
{
    prod_id: mongoose.Types.ObjectId,
    name: { String},
    brand: { String},
    quantity: { Number},
    sku: { Number},
    color: { String},
    size: { String},
    category: { String},
},
{
    bufferCommands: false,
    autoCreate: false
}
)

module.exports = mongoose.model("Product", products);