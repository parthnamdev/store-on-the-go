const mongoose = require('mongoose');

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

const Consumer = mongoose.model('consumer', consumerSchema);

module.exports = Consumer;