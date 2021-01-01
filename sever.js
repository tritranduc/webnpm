const express = require("express")
const https = require('https');
const fs = require('fs');
const http = require('http');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var indexRouter = require("./routes/index")


var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};


app.use('/', indexRouter);


severhttp = http.createServer(app)
severhttps = https.createServer(options, app)



severhttp.listen(8000);
severhttps.listen(8080);
