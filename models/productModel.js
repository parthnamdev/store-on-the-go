const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    seller: String,
    city: String,
    quantity: Number,
    image: {
        mimetype: String,
        data: Buffer
    },
    tags: [String]
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;