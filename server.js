require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const expressSession = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(expressSession);
const { v4: uuidv4 } = require('uuid');

const homeRouter = require('./routes/homeRoutes');
const consumerRouter = require('./routes/consumerRoutes');
const sellerRouter = require('./routes/sellerRoutes');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use('/',express.static(__dirname + "/public"));
app.use('/',express.static(__dirname + "/node_modules/bootstrap"));

app.use('/consumer',express.static(__dirname + "/public"));
app.use('/consumer',express.static(__dirname + "/node_modules/bootstrap"));

app.use('/seller',express.static(__dirname + "/public"));
app.use('/seller',express.static(__dirname + "/node_modules/bootstrap"));

app.use(expressSession({secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: false, cookie: { maxAge: 2*60*60*1000 }, store: new MongoStore({mongooseConnection: mongoose.connection, autoRemove: 'interval', autoRemoveInterval: 60})}));
app.use(passport.initialize());
app.use(passport.session());

// const uri = `${"mongodb+srv://"+process.env.ATLAS_USER+":"+process.env.ATLAS_PASSWORD+"@"+process.env.ATLAS_CLUSTER+".dcdll.mongodb.net/"+process.env.ATLAS_DB_NAME+"?retryWrites=true&w=majority"}`;
const uri = 'mongodb://localhost:27017/storeDB';
mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true });
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", () => {
    console.log("database connected");
});

app.use('/', homeRouter);
app.use('/consumer', consumerRouter);
app.use('/seller', sellerRouter);
// app.get('/',(req,res) => {
//     res.render('home');
// })

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server running on port " + port);
});