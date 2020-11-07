const sellerDB = require('./sellerDBController');
const consumerDB = require('./consumerDBController');
const Product = require('../models/productModel');
const keyword_extractor = require('keyword-extractor');

const index = (req, res) => {
    res.render('home');
}

const loginPage = (req, res) => {
    if(req.signedCookies.user != undefined) {
        req.user = req.signedCookies.user;
        res.redirect('/'+ req.user.person);
        // switch (req.user.person) {
        //     case "consumer":
        //         res.redirect('/'+ req.user.person + '/'+req.user.city);
        //         break;
        //     case "seller":
        //         res.redirect('/'+ req.user.person);
        //         break;
        //     default:
        //         res.render('login');
        //         break;
        // }
    } else {
        res.render('login');
    }
}

const signupPage = (req, res) => {
    res.render('signup');
}

const explore = (req, res) => {
    Product.find({city: req.body.input}, (err, found) => {
        if(!err && found) {
            res.render('exploreCity', {city: req.body.input, products: found});
        } else {
            res.render('err', {error: "error in searching products"})
        }
    })
    
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

    // req.logout();
    req.user = null;
    res.clearCookie("user");
    res.redirect('/');
}

const keywords = (string) => {
    let tags = [];
    const tagString = string;
         tags = keyword_extractor.extract(tagString, {
            language: "english",
            remove_digits: false,
            return_changed_case: true,
            remove_duplicates: true
        });
    return tags;
}

const search = (req, res) => {
    Product.find({city: req.body.explorecity}, (err, found) => {
        if(!err && found) {
            const sorted = [];
            const tagString = req.body.input;
            const tags = keywords(tagString);
            // console.log(tags);
            found.forEach(element => {
                let checker = 0;
                let sort = {};
                tags.forEach(element1 => {
                    if(element.tags.includes(element1)) {
                        checker=checker+1;
                    }
                });
                if(checker > 0) {
                    sort = {
                        product: element,
                        tags: checker
                    }
                    sorted.push(sort);
                }
                
            });
            const sortAccToTags = sorted.sort((a, b) => parseFloat(b.tags) - parseFloat(a.tags));
            // console.log(sortAccToTags);
            const final = [];
            sortAccToTags.forEach(element => {
                final.push(element.product);
            });
            res.render('exploreCity',{products:final, city: req.body.explorecity});
        } else {
            res.render('err', {error: "error searching products"});
        }
        
})
}

const suggest = (req, res) => {
    Product.find({city: req.params.city}, (err, found) => {
        const result = [];
        found.forEach(element1 => {
            element1.tags.forEach(element => {
                if(element.startsWith(req.params.input.toLowerCase())) {
                    result.push(element);
                    result.push(element1.name);
                }
            });
        });
        const uniqueResults = [...new Set(result)];
        res.json(uniqueResults);
    })
}


module.exports = {
    index, loginPage, signupPage, explore, register, login, logout, search, suggest
}