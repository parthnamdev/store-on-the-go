const sellerDB = require('./sellerDBController');
const consumerDB = require('./consumerDBController');

const index = (req, res) => {
    res.render('home');
}

const loginPage = (req, res) => {
    if(req.signedCookies.user != undefined) {
        req.user = req.signedCookies.user;
        res.redirect('/consumer/'+req.user.city);
        
    } else {
        res.render('login');
    }
}

const signupPage = (req, res) => {
    res.render('signup');
}

const explore = (req, res) => {
    res.render('exploreCity', {city: req.body.input});
}

const register = (req, res) => {
    
    switch (req.body.person) {
        case 'consumer':
            {
                consumerDB.register(req, res);
            }
            break;

        case 'seller':
            {
                sellerDB.register(req, res);
            }
            break;
    
        default:
            res.render('err',{error:"invalid action or some unexpected error occured."});
            break;
    }
}

const login = (req, res) => {
    
    switch (req.body.person) {
        case 'consumer':
            {
                consumerDB.login(req, res);
            }
            break;

        case 'seller':
            {
                sellerDB.login(req, res);
            }
            break;
        
        default:
            res.render('err',{error:"invalid action or some unexpected error occured."});
            break;
    }
}

const logout = (req, res) => {

    req.logout();
    res.clearCookie("user");
    req.user = null;
    res.redirect('/');
}

module.exports = {
    index, loginPage, signupPage, explore, register, login, logout
}