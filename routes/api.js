var express = require('express');
const multipart = require('connect-multiparty');
var router = express.Router();
const fs = require('fs');
const path = require('path')
const util = require('util')

const P_readdir = util.promisify(fs.readdir)
const P_stat = util.promisify(fs.stat)

const multipartyMiddleware = multipart();
//一个用于解析formData对象的第三方中间件

router.use(multipart({uploadDir:'./upload' }))
//设置上传的音频文件的存放路径

let dir = path.resolve("") //存放模型的路径

router.get('/synthesizers', function (req, res, next) {
    let list = new Array() //存放模型信息
    (async () => {
        try {
            let files = await P_readdir(dir) //用fs模块读取路径
            for(let i = 0; i < files.length; i++)
            {
                let fileName = files[i]
                let filePath = path.join(dir, fileName)
                let stat = await P_stat(filePath)
                if(stat.isFile)
                {
                    list.push({
                        path: filePath,
                        name: fileName
                    })
                    console.log(`检测到模型${fileName},路径为${filePath}`)
                }
            }
        } 
        catch (err) {
            console.error(err)
        }
    })()

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