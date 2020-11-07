const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const Consumer = require('../models/consumerModel');
const Product = require('../models/productModel');
const { checkout } = require('../routes/homeRoutes');

const register = (req, res) => {
    Consumer.findOne({username: req.body.username}, (err, found) => {
        if(found) {
            res.render('err',{error: "username already exist! please choose other username"});
        } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const newConsumer = {
                    uuid: uuidv4(),
                    username: req.body.username,
                    email: req.body.email,
                    contact: req.body.contact,
                    name: req.body.name,
                    address: [req.body.address],
                    city: req.body.city,
                    password: hash
                }
                Consumer.create(newConsumer, (err, person) => {
                    if(!err) {
                        res.cookie("user", newConsumer, { signed:true, maxAge: 60*60*1000});
                        res.redirect('/consumer');
                    } else {
                        console.log(err);
                        res.render('err', {error: "error in registering. try after some time or contact dev team."});
                    }
                })
            })
            .catch((err) =>{
                res.render('err', {error: "there was an error while encrypting password hence the operation was aborted. Your password safety is important for us."})
            })
        }
    })
}

const login = (req, res) => {
    Consumer.findOne({username: req.body.username}, (err, found) => {
        if(!err && found) {
            bcrypt.compare(req.body.password, found.password).then((result) => {
                if(result) {
                    res.cookie("user", found, { signed:true, maxAge: 60*60*1000});
                    res.redirect('/consumer');
                } else {
                    res.render('err',{error: "invalid password. please check your password"});
                }
            }).catch((err) => {
                res.render('err', {error: "there was an error while decrypting password hence the operation was aborted. Your password safety is important for us."})
            })
        } else {
            res.render('err',{error: "no user found."});
        }
    })
}

const changeLocation = (req, res) => {
    Consumer.findOneAndUpdate({uuid: req.user.uuid}, {city: req.body.input}, (err, docs) => {
        if(!err) {
            const temp = req.user;
            temp.city = req.body.input;
            res.cookie("user", temp, { signed:true, maxAge: 60*60*1000});
            res.redirect('/consumer');
        } else {
            res.render('err', {error: "error in changing location"});
        }
    });
}

const deleteAddress = (req, res) => {
    Consumer.findOne({uuid: req.user.uuid},(err, found) => {
        if(!err && found) {
            found.address = found.address.filter(item => item !== req.body.address);
            found.save((err) => {
                if(!err) {
                    const temp = req.user;
                    temp.address = found.address;
                    res.cookie("user", temp, { signed:true, maxAge: 60*60*1000});
                    res.redirect('/consumer/profile');
                } else {
                    res.render('err', {error: "error removing address"});
                }
            })
        } else {
            res.render('err', {error: "error removing address"});
        }
    })
}

const addAddress = (req, res) => {
    Consumer.findOne({uuid: req.user.uuid},(err, found) => {
        if(!err && req.body.new_address != null && found) {
            found.address.push(req.body.new_address);
            found.save((err) => {
                if(!err) {
                    const temp = req.user;
                    temp.address = found.address;
                    res.cookie("user", temp, { signed:true, maxAge: 60*60*1000});
                    res.redirect('/consumer/profile');
                } else {
                    console.log(err);
                    res.render('err', {error: "error adding new address"});
                }
            })
        } else {
            res.render('err', {error: "error adding new address"});
        }
    })
}

const getCartProducts = (req, res) => {
    Consumer.findOne({uuid: req.user.uuid}, (err, found) => {
        
        if(!err && found) {
            let products = [];
            if(found.cart.length == 0) {
                res.render('consumerCart',{products:products, city: req.user.city, total: 0, addresses: found.address});
            }
            for(let i=0; i< found.cart.length; i++) {
                Product.findById(found.cart[i].product, (err, founded) => {
                    products.push({product: founded, quantity: found.cart[i].quantity});
                    if(i == found.cart.length-1) {
                        let total = 0;
                        products.forEach(element => {
                            total = total + parseInt(element.product.price)*parseInt(element.quantity);
                        });
                        res.render('consumerCart',{products:products, city: req.user.city, total: total, addresses: found.address});
                    }
                })
            }
        } else {
            console.log(err);
            res.render('err', {error: "error loading cart"})
        }
    })
}

const addToCart = (req, res) => {
    Consumer.findOne({uuid: req.user.uuid}, (err, found) => {
        const toCart = {
            product: req.body.id,
            quantity: 1
        }
        let checker=0;
        found.cart.forEach(element => {
            if(element.product == req.body.id) {
                checker=1;
                element.quantity=element.quantity+1;
            }
        });
        if(checker==0) {
            found.cart.push(toCart);
        }
        const cartClone = found.cart;
        found.save((errr) => {
            if(!errr) {
                console.log('saved');
                const temp = req.user;
                temp.cart = [];
                temp.cart = cartClone;
                res.cookie("user", temp, { signed:true, maxAge: 60*60*1000});
                res.redirect('/consumer');
            } else {
                console.log(errr);
                res.render('err', {error: "error adding to cart"}); 
            }
        })
                
        

    })
}

const cartQuantity = (req, res) => {
    Consumer.findOne({uuid: req.user.uuid}, (err, found) => {
        if(!err && found) {
            found.cart.forEach(element => {
                if(element.product == req.body.product) {
                    switch (req.body.operation) {
                        case "plus":
                            {
                                element.quantity = element.quantity + 1;
                            }
                            
                            break;
                        case "minus":
                            {
                                if(element.quantity == 1){
                                    found.cart = found.cart.filter(item => item !== element);
                                }else {
                                    element.quantity = element.quantity - 1;
                                }
                            }
                            
                            break;
                        default:
                            break;
                    }
                    const cartClone = found.cart;
                found.save((errr) => {
                    if(!errr) {
                        console.log('saved');
                        const temp = req.user;
                        temp.cart = [];
                        temp.cart = cartClone;
                        res.cookie("user", temp, { signed:true, maxAge: 60*60*1000});
                        res.redirect('/consumer/cart');
                    } else {
                        console.log(errr);
                        res.render('err', {error: "error in changing quantity"}); 
                    }
                })
                } else {

                }
                
            });
        } else {
            res.render('err', {error: "error in changing quantity"});
        }
    })
}

const deleteUser = (req, res) => {
    Consumer.findOneAndDelete({uuid: req.user.uuid}, (err, docs) => {
        if(!err) {
            req.user = null;
            res.clearCookie("user");
            res.redirect('/');
        } else {
            res.render('err', {error: "error in deleting user"});
        }
    })
}


module.exports = {
    register, login, changeLocation, deleteAddress, addAddress, getCartProducts, addToCart, cartQuantity, deleteUser
}
