require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const expressSession = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(expressSession);
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const homeRouter = require('./routes/homeRoutes');
const consumerRouter = require('./routes/consumerRoutes');
const sellerRouter = require('./routes/sellerRoutes');
const Seller = require('./models/sellerModel');
const fs = require('fs');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));


// app.use(expressSession({secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: false, cookie: { maxAge: 2*60*1000 }}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cookieParser(process.env.SESSION_SECRET));

const uri = `${"mongodb+srv://"+process.env.ATLAS_USER+":"+process.env.ATLAS_PASSWORD+"@"+process.env.ATLAS_CLUSTER+".fzmhp.mongodb.net/"+process.env.ATLAS_DB_NAME+"?retryWrites=true&w=majority"}`;
// const uri = 'mongodb://localhost:27017/storeDB';
mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false });
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", async () => {
    fs.rmdir('./uploads', {recursive: true}, async (err) => {
        if(err){
            console.log(err);
        } else {
        console.log('..\nresetting uploads dir...');
        Seller.find({},(err,found) => {
            found.forEach(element => {
                const create_folder = `${"./uploads/" + element.uuid}`;
                fs.mkdir(create_folder, {recursive: true}, function(err) {
                    if(err) {
                        console.log(err);
                    };
                });
            });
            console.log('successfully completed');
            console.log("..\ndatabase connected");
        });
    
        }
    })
});


// app.get('/',(req,res) => {
//     res.render('home');
// })
app.use('/',express.static(__dirname + "/public"));
app.use('/',express.static(__dirname + "/node_modules/bootstrap"));
app.use('/',express.static(__dirname + "/node_modules/@fortawesome"));
app.use('/',express.static(__dirname + "/node_modules/@popperjs"));
app.use('/',express.static(__dirname + "/node_modules/jquery"));

app.use('/consumer',express.static(__dirname + "/public"));
app.use('/consumer',express.static(__dirname + "/node_modules/bootstrap"));
app.use('/consumer',express.static(__dirname + "/node_modules/@fortawesome"));
app.use('/consumer',express.static(__dirname + "/node_modules/@popperjs"));
app.use('/consumer',express.static(__dirname + "/node_modules/jquery"));

app.use('/seller',express.static(__dirname + "/public"));
app.use('/seller',express.static(__dirname + "/node_modules/bootstrap"));
app.use('/seller',express.static(__dirname + "/node_modules/@fortawesome"));
app.use('/seller',express.static(__dirname + "/node_modules/@popperjs"));
app.use('/seller',express.static(__dirname + "/node_modules/jquery"));

app.use('/product',express.static(__dirname + "/public"));
app.use('/product',express.static(__dirname + "/node_modules/bootstrap"));
app.use('/product',express.static(__dirname + "/node_modules/@fortawesome"));
app.use('/product',express.static(__dirname + "/node_modules/@popperjs"));
app.use('/product',express.static(__dirname + "/node_modules/jquery"));

app.use('/', homeRouter);
app.use('/consumer', consumerRouter);
app.use('/seller', sellerRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server running on port " + port);
});

app.get('*', (req, res) => {
    res.render('404');
});
app.post('*', (req, res) => {
    res.render('404');
});
