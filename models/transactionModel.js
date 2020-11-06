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
    totalPrice: Number,
    product: [{
        product: String,
        quantity: Number,
        seller: String
    }],
    address: String,
    payment_type: String,
    time: Number
},{timestamps: true});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;