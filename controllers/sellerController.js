const productDB = require('../controllers/productDBController');
const sellerDB = require('./sellerDBController');
const transactDB = require('./transactionDBController');

const index = (req, res) => {
    productDB.findProductsForSeller(req, res);
}

const transactions = (req, res) => {
    transactDB.sellerTransactions(req, res);
    // res.render('sellerTransactions');
}

const profile = (req, res) => {
    const createAvatar = (fullname) => {
        var names = fullname.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };
    const avatar = createAvatar(req.user.name);
    res.render('sellerProfile',{user: req.user, avatar: avatar});
}

const newProduct = (req, res) => {
    res.render('sellerAddProduct');
}

const addProduct = (req, res) => {
    productDB.addProduct(req, res);
}

const findProductById = (req, res) => {
    productDB.findProductById(req, res);
}

const editProduct = (req, res) => {
    productDB.editProduct(req, res);
}

const editProductImage = (req, res) => {
    productDB.editProductImage(req, res);
}

const deleteProduct = (req, res) => {
    productDB.deleteProduct(req, res);
}

const deleteUser = (req, res) => {
    sellerDB.deleteUser(req, res);
}

module.exports = {
    index, transactions, profile, newProduct, addProduct, findProductById, editProduct, editProductImage, deleteProduct, deleteUser
}