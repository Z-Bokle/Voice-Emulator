var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();


router.get('/synthesizers', function (req, res, next) {
    res.send([{name:"111",path:"222"},{name:"333",path:"444"}])
    //改成对应的synthesizer模型及其路径
});

router.post('/MockingBird',function(req, res, next){
    console.log(req.body)
})

module.exports = router;