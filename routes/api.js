var express = require('express');
const multipart = require('connect-multiparty');
var router = express.Router();
const fs = require('fs');

const multipartyMiddleware = multipart();

router.use(multipart({uploadDir:'./upload' }))

router.get('/synthesizers', function (req, res, next) {
    res.send([{name:"111",path:"222"},{name:"333",path:"444"}])
    //改成对应的synthesizer模型及其路径
});

//调用声音合成api
router.post('/MockingBird',multipartyMiddleware,function(req, res, next){
    let formData = req.body //表单字段
    let fileData = req.files.file //文件信息
    let filePath = fileData.path //文件路径
    let size = fileData.size //文件大小
    
    console.log(formData)
    console.log(filePath,size)
    fs.rename(filePath,filePath + '.wav',(err)=>{
        if(err)
        console.error(err)
    })
    filePath=filePath + '.wav'
})

module.exports = router;