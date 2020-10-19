const mongoose = require('mongoose');
const Product = require('./productModel');

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

const transactionSchema = new mongoose.Schema({
    id: String,
    consumer: String,
    product: [productSchema]
},{timestamps: true});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;