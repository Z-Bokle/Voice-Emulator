var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  let login_status="未登录";
  if(req.signedCookies.mail)
  login_status="欢迎您," + req.signedCookies.mail;

  res.render('index', {login_status:login_status,login:req.signedCookies.mail});
});

module.exports = router;