const product = require('./products');

const index = (req, res) => {
    res.render('consumerExplore',{products:product, city: req.params.city});
}

const location = (req, res) => {
    res.render('consumerLocation',{city: req.user.city});
}

const cart = (req, res) => {
    res.render('consumerCart',{products:product, city: req.user.city});
}

const profile = (req, res) => {
    res.render('consumerProfile',{city: req.user.city});
}

module.exports = {
    index, location, cart, profile
}