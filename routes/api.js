var express = require('express');
const multipart = require('connect-multiparty');
var router = express.Router();
const fs = require('fs');
const path = require('path')

const multipartyMiddleware = multipart();
//一个用于解析formData对象的第三方中间件

router.use(multipart({uploadDir:'./upload' }))
//设置上传的音频文件的存放路径

let dir = path.resolve("") //存放模型的路径

router.get('/synthesizers', function (req, res, next) {
    let list = new Array() //存放模型信息
    fs.readdir(dir,(err,files) => {
        //用fs模块读取路径
        if(err) console.error(err)
        else{
            files.forEach((fileName) => {
                //遍历目录下的项目，可能为文件夹或文件
                let filePath = path.join(dir,fileName)
                fs.stat(filePath,(err,stat) => {
                    if(err) console.error(err)
                    else{
                        if(stat.isFile() && fileName.substring(fileName.length-3,3) == ".pt")
                        {
                            //是文件且文件名结尾为.pt
                            list.push({
                                path: filePath,
                                name: fileName
                            })
                            console.log(`检测到模型${fileName},路径为${filePath}`)                            
                        }
                    }
                }) 
            })
        }
    })
    //这里回调函数太多了，重构成为基于Promise对象的逻辑会更简洁
    res.send(list)
    //返回包含synthesizer模型及其路径的一个Array
})

//接收上传的音频
//然后调用声音合成api
//最后返回合成的声音
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