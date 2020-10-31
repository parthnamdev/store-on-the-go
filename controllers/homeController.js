const index = (req, res) => {
    res.render('home');
}

const login = (req, res) => {
    res.render('login');
}

const signup = (req, res) => {
    res.render('signup');
}

const explore = (req, res) => {
    res.render('exploreCity');
}

module.exports = {
    index, login, signup, explore
}