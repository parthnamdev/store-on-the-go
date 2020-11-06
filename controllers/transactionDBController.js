const { v4: uuidv4 } = require('uuid');
const Consumer = require('../models/consumerModel');
const Transaction = require('../models/transactionModel');

const checkOut = (req, res) => {
    // console.log(req.body);
    const products = req.body.allProducts.split("full");
    const productArray = [];
    products.forEach(element => {
        if(element != '') {
            const splits = element.split("half");
            const temp = {
                product: splits[0],
                quantity: splits[1],
                seller: splits[2]
            }
            productArray.push(temp)
        }
    });
    // console.log(productArray);
    const newTransaction = {
        id: uuidv4(),
        consumer: req.user.uuid,
        total: req.body.totalPrice,
        product: productArray,
        address: req.body.addresses,
        payment_type: req.body.payment_option,
        time: Date.now()
    }

    Transaction.create(newTransaction, (err, transaction) => {
        if(!err) {
            Consumer.findOne({uuid: req.user.uuid}, (errr, found) => {
                if(!errr && found) {
                    found.cart = [];
                    const cartClone = found.cart;
                    found.save((er) => {
                        if(!er) {
                            console.log('saved');
                            const temp = req.user;
                            temp.cart = cartClone;
                            res.cookie("user", temp, { signed:true, maxAge: 60*60*1000});
                            res.redirect('/consumer/successTransaction');
                        } else {
                            console.log(errr);
                            res.render('err', {error: "error in changing quantity"}); 
                        }
                    })
                }
            })
        } else {
            res.render('err', {error: "error in checking out"});
        }
    })
}

const consumerProfilePage = (req, res) => {
    Transaction.find({consumer: req.user.uuid}, (err, found) => {
        if(!err && found) {
                const createAvatar = (fullname) => {
                    var names = fullname.split(' '),
                    initials = names[0].substring(0, 1).toUpperCase();
        
                    if (names.length > 1) {
                    initials += names[names.length - 1].substring(0, 1).toUpperCase();
                    }
                    return initials;
                };
                const avatar = createAvatar(req.user.name);
                
                res.render('consumerProfile',{user: req.user, avatar: avatar, transactions: found});
        } else {
            res.render('err', {error: "error loading profile page"});
        }
    })
}

const sellerTransactions = (req, res) => {
    Transaction.find({}, (err, found) => {
        const sorted = []
        found.forEach(element1 => {
            element1.product.forEach(element => {
                if(element.seller == req.user.uuid) {
                    sorted.push(element1);
                }
            });
        });
        
        res.render('sellerTransactions', {transactions: sorted, user: req.user});
    })
}

module.exports = {
    checkOut, consumerProfilePage, sellerTransactions
}