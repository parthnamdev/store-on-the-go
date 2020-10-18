const index = (req, res) => {
    res.render('consumerExplore');
}

const location = (req, res) => {
    res.render('consumerLocation');
}

const cart = (req, res) => {
    res.render('consumerCart');
}

const profile = (req, res) => {
    res.render('consumerProfile');
}

module.exports = {
    index, location, cart, profile
}