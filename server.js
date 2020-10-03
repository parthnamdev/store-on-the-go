const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const homeRouter = require('./routes/homeRoutes');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// app.use('/', homeRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server running on port " + port);
});