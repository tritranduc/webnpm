var express = require('express');
var router = express.Router();
let ejs = require('ejs');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('uploadfile', { title: 'upload file' });
});
module.exports = router;
