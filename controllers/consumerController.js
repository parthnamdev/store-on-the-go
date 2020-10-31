const product = require('./products');
const index = (req, res) => {
    res.render('consumerExplore');
}

const location = (req, res) => {
    res.render('consumerLocation');
}

const cart = (req, res) => {
    res.render('consumerCart',{product:product});
}

const profile = (req, res) => {
    res.render('consumerProfile');
}

module.exports = {
    index, location, cart, profile
}