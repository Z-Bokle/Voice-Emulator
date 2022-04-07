var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();

router.get('/', function (req, res, next) {
  if(!req.signedCookies.mail)
  {
      res.render('logout');
  } 
  else
  {
      res.render('tools');
  }
  
});



module.exports = router;