const express = require("express")
const https = require('https');
const fs = require('fs');
const http = require('http');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var indexRouter = require("./routes/index")
var adminpage = require("./routes/admin")
var uploadfilepage = require("./routes/uploadfile")
var formidable = require('formidable');
const bodyParser= require('body-parser')
const multer = require('multer');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/file')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})

var upload = multer({ storage: storage })

app.use('/', indexRouter);
app.use('/admin', adminpage);
app.use("/uploadfilepage",uploadfilepage)
app.post('/profile', upload.single('file'), function (req, res, next) {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    console.log(req.file)
    res.send("tai file len thanh cong thong tin la : ")
    res.send(file)
})
app.post('/profile', upload.array('file',2000), function (req, res, next) {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    console.log(req.file)
    res.send("tai file len thanh cong thong tin la : ")
    res.send(file)
})



severhttp = http.createServer(app)
severhttps = https.createServer(options, app)



severhttp.listen(8000);
severhttps.listen(8080);
