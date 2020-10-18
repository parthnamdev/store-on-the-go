const index = (req, res) => {
    res.render('sellerExplore');
}

const transactions = (req, res) => {
    res.render('sellerTransactions');
}

const profile = (req, res) => {
    res.render('sellerProfile');
}

module.exports = {
    index, transactions, profile
}