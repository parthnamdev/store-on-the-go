const sellerDB = require('./sellerDBController');

const index = (req, res) => {
    res.render('sellerExplore');
}

const transactions = (req, res) => {
    res.render('sellerTransactions');
}

const profile = (req, res) => {
    res.render('sellerProfile');
}

const newProduct = (req, res) => {
    res.render('sellerAddProduct');
}

const addProduct = (req, res) => {
    
}

module.exports = {
    index, transactions, profile, newProduct, addProduct
}