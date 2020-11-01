const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require('passport');

const consumerSchema = new mongoose.Schema({
    uuid: String,
    username: String,
    password: String,
    email: String,
    contact: Number,
    name: String,
    address: [String],
    city: String
});

consumerSchema.plugin(passportLocalMongoose);
const Consumer = mongoose.model('consumer', consumerSchema);

passport.use(Consumer.createStrategy());
passport.serializeUser(Consumer.serializeUser());
passport.deserializeUser(Consumer.deserializeUser());

module.exports = Consumer;