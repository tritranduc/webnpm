var express = require('express');
var router = express.Router();
let ejs = require('ejs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'admin' });
});
module.exports = router;
