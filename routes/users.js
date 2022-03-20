const express = require('express')
const router = express.Router()
const User = require('../public/database/model/userModel') // 引入用户数据库模型
const codeModel = require('../public/database/model/codeModel')//引入验证码数据库模型
const mailSend = require('../public/sendmail')


var fs=require('fs');



/**
 * @api {post} /users/reg 用户注册
 * @apiName 用户注册
 * @apiGroup Users
 *
 * @apiParam {String} mail 用户名
 * @apiParam {String} ps 用户密码
 * @apiParam {String} code 邮箱验证码
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.get('/checkNet',function(req,res,next){
  res.status(200).send('ok');//用于ajax同步检查网络连接情况
})

router.get('/', function(req, res, next) {
	res.writeHead(200,{'Content-Type':'text/html'});
	fs.readFile('./public/html/register.html','utf-8',function(err,data){
		if(err){
			throw err ;
		}
		res.end(data);//向浏览器返回文件并结束链接
	});
});

router.post('/reg', (req, res) => {
  // 获取数据
  let { mail, ps, code } = req.body

  let done = false;//代表给浏览器的消息已经发送完毕

  if (mail && ps && code) {
    // 判断验证码是否OK
    codeModel.find({mail,code})
    .then((data) => {
      if(!data.length){
        done = true;
        res.send({err: -4, msg: '验证码错误'})  //未查询到记录     
      }
      if(data.length && data[0].time + 300000 < Date.now()){  
        done = true;
        res.send({err: -5, msg: '验证码过期'})  //验证码已到期
      }
    })
    .catch((err) => {
      if(!done)
      {
        done = true;
        res.send({ err: -2, msg: '注册失败'})        
      }
    })

    if(!done)
    User.find({mail})//返回一个Promise实例
    .then((data) => {
      //Promise resolved 查找操作成功完成
      if (!data.length) {
        // 用户名不存在 可以注册
        done = true;
        res.send({ err: 0, msg: '注册成功'})
        return User.insertMany({ mail: mail, ps: ps})//后续不再设置Promise.then()
      } 
      else {
        done = true;
        res.send({err: -3, msg: '用户名已存在'})
        throw 'error' //抛出异常，使得后续代码转入catch
      }
    })
    .catch(err => {
      if(err != 'error' && !done) res.send({ err: -2, msg: '注册失败'})
    })
  } 
  else 
  {
    return res.send({err: -1, msg: '参数错误'})
  }


})
/**
 * @api {post} /users/login 登录
 * @apiName 登录
 * @apiGroup Users
 *
 * @apiParam {String} mail 用户名
 * @apiParam {String} ps 用户密码
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/login', (req, res) => {
  console.log(req.body)
  let { mail, ps } = req.body

  console.log({mail, ps})
  if (mail && ps) {
    User.find({ mail, ps })
    .then((data) => {
      if (data.length > 0) {
        res.send({err: 0, msg: '登录成功'})
      } 
      else {
        res.send({err: -2, msg: '用户名或者密码不正确'})
      }
    })
    .catch(err => {
      return res.send({err: -1, msg: '内部错误'})
    })
  } 
  else {
    return res.send({err: -1, msg: '参数错误'})
  }
})

// 发送邮件验证码
/**
 * @api {post} /users/getMailCode 邮箱验证码发送
 * @apiName 邮箱验证码发送
 * @apiGroup Users
 *
 * @apiParam {String} mail 邮箱
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getMailCode', (req, res) => {
  let { mail } = req.body
  if (mail) {
    let code = Math.random().toString().slice(-6); // 随机6位验证码
    

    codeModel.insertMany({mail:mail,code:code,time:Date.now()})  //以数字形式存储而非字符串，注册时比较验证码也是严格Number类型的比较
    .then(() => {
      //插入成功则发送邮件并返回信息
      mailSend.send(mail, code)
      .then(() => {
        //邮件发送成功
        res.send({err: 0, msg: '验证码发送成功'})
      })
      .catch((err) => {
        //邮件发送失败
        res.send({err: -2, msg: '验证码发送失败'})
      })
    })
    .catch(() => {
      //插入失败
      res.send({err : -3, msg: '数据库错误'})
    })    
  } 
  else {
    res.send({err: -1, msg: '参数错误'})
  }
})

module.exports = router