const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const NodeCache = require('node-cache');
const myCache = new NodeCache();

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