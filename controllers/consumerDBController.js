const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const Consumer = require('../models/consumerModel');

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
                        res.redirect('/consumer/' + newConsumer.city);
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
                    res.redirect('/consumer/' + found.city);
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

module.exports = {
    register, login
}