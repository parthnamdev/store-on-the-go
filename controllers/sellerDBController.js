const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const fs = require('fs');

const Seller = require('../models/sellerModel');


const register = (req, res) => {
    Seller.findOne({username: req.body.username}, (err, found) => {
        if(found) {
            res.render('err',{error: "username already exist! please choose other username"});
        } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const newSeller = {
                    uuid: uuidv4(),
                    username: req.body.username,
                    email: req.body.email,
                    contact: req.body.contact,
                    name: req.body.name,
                    address: req.body.address,
                    city: req.body.city,
                    password: hash
                }
                Seller.create(newSeller, (err, person) => {
                    if(!err) {
                        const create_folder = `${"./uploads/" + newSeller.uuid}`;
                        fs.mkdir(create_folder, {recursive: true}, function(errr) {
                            if(errr) {
                                console.log(err);
                            };
                        });
                        res.cookie("user", newSeller, { signed:true, maxAge: 60*60*1000});
                        res.redirect('/seller');
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
    Seller.findOne({username: req.body.username}, (err, found) => {
        if(!err && found) {
            bcrypt.compare(req.body.password, found.password).then((result) => {
                if(result) {
                    res.cookie("user", found, { signed:true, maxAge: 60*60*1000});
                    res.redirect('/seller');
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

const deleteUser = (req, res) => {
    Seller.findOneAndDelete({uuid: req.user.uuid}, (err, docs) => {
        if(!err) {
            
            res.clearCookie("user");
            req.user = null;
            res.redirect('/');
        } else {
            res.render('err', {error: "error in deleting user"});
        }
    })
}

module.exports = {
    register, login, deleteUser
}