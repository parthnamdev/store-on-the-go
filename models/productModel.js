const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    seller: String,
    quantity: Number,
    image: {
        type: String,
        data: Buffer
    }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;