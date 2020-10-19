const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require('passport');

const sellerSchema = new mongoose.Schema({
    uuid: String,
    username: String,
    password: String,
    email: String,
    contact: Number,
    name: String,
    address: String,
    city: String,
    state: String
});

sellerSchema.plugin(passportLocalMongoose);
const Seller = mongoose.model('seller', sellerSchema);

passport.use(Seller.createStrategy());
passport.serializeUser(Seller.serializeUser());
passport.deserializeUser(Seller.deserializeUser());

module.exports = Seller;