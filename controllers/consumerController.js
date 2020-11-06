const consumerDB = require('./consumerDBController');
const productDB = require('./productDBController');
const transactionDB = require('./transactionDBController');

const index = (req, res) => {
    productDB.findProductsForCity(req, res);
}

const location = (req, res) => {
    res.render('consumerLocation',{city: req.user.city});
}

const cart = (req, res) => {
    consumerDB.getCartProducts(req, res);
    // res.render('consumerCart',{products:product, city: req.user.city});
}

const profile = (req, res) => {
    // const createAvatar = (fullname) => {
    //     var names = fullname.split(' '),
    //         initials = names[0].substring(0, 1).toUpperCase();
        
    //     if (names.length > 1) {
    //         initials += names[names.length - 1].substring(0, 1).toUpperCase();
    //     }
    //     return initials;
    // };
    // const avatar = createAvatar(req.user.name);
    transactionDB.consumerProfilePage(req, res);
    // res.render('consumerProfile',{user: req.user, avatar: avatar});
}

const findProductById = (req, res) => {
    productDB.findProductByIdForConsumer(req, res);
}

const changeLocation = (req, res) => {
    consumerDB.changeLocation(req, res);
}

const deleteAddress = (req, res) => {
    consumerDB.deleteAddress(req, res);
}

const addAddress = (req, res) => {
    consumerDB.addAddress(req, res);
}

const addToCart = (req, res) => {
    consumerDB.addToCart(req, res);
}
const cartQuantity = (req, res) => {
    consumerDB.cartQuantity(req, res);
}

const checkOut = (req, res) => {
    transactionDB.checkOut(req, res);
}

const successTransaction = (req, res) => {
    res.render('consumerSuccessTransaction');
}

const searchProducts = (req, res) => {
    productDB.searchProducts(req, res);
}

const deleteUser = (req, res) => {
    consumerDB.deleteUser(req, res);
}

module.exports = {
    index, location, cart, profile, findProductById, changeLocation, deleteAddress, addAddress, addToCart, cartQuantity, checkOut, successTransaction, searchProducts, deleteUser
}