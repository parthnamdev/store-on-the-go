const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    uuid: String,
    username: String,
    password: String,
    email: String,
    contact: Number,
    name: String,
    address: String,
    city: String
});

const Seller = mongoose.model('seller', sellerSchema);

module.exports = Seller;
