const index = (req, res) => {
    res.render('home');
}

const login = (req, res) => {
    res.render('login');
}

const signup = (req, res) => {
    res.render('signup');
}

module.exports = {
    index, login, signup
}