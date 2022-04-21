## 已使用的开源项目  
- nodejs  
- express
- pwabuilder  
- nodemailer  
- mongoDB  
- mongoose  

## 参考中的开源项目  

## 运行方法
在根目录下运行命令
```
npm start
```

## 随手记录  
- 由于service worker支持离线缓存，因此无法访问DOM,故登录、注册等请求通过form实现  
- 由于提交表单时检查网络应实时进行，因此逻辑上无法采用异步编程（因为要等待GET的结果），故不采用fetch方法作为测试网络的途径，使用同步的ajax实现  
- 由于service worker体系只能工作在https协议下（本地调试可以用http）因此密码等信息可以明文传输，无需加密
- 默认开放端口为3000，如需更改需要进入./bin/www内修改  
- 由于前端传来的信息并不一定可靠，注册/登录的表单信息是否合法还需要在后端进一步验证
- 理论上每次注册和登录操作都需要用户使用一次验证码以屏蔽机器人操作，由于非核心内容这里略去实现，需要前后端协作完成
- https://www.expressjs.com.cn/starter/examples.html

## 项目结构
├─bin   二进制文件  
├─node_modules  nodejs模块  
├─public    站点根目录  
│  ├─database   数据库相关  
│  │  └─model   数据库模型  
│  ├─html   静态页面文件  
│  ├─images     图像  
│  └─js     javascript脚本  
└─routes    路由设置  

## TODO List  
- [x] 邮箱注册和登录  
- [x] 数据库链接  
- [x] 前端验证表单有效性  
- [x] 提交表单前验证网络情况  
- [x] 后端创建cookie保留登录信息  
- [ ] 实现退出登录的请求(删除cookie并重新载入)
- [ ] 后端验证表单信息合法性  
- [ ] 前端CSS配置  
- [x] 后端验证码存储到数据库  
- [ ] 前端表单非法时给用户的提示信息(配合ejs更简单)  
- [ ] 服务器消息推送  
- [ ] 客户端service worker接收消息推送(https://docs.microsoft.com/zh-cn/microsoft-edge/progressive-web-apps-chromium/how-to/notifications-badges)  
- [ ] service worker发出本地通知  
- [ ] 通过路由设置实现验证cookie后不同情况下的页面重定向  
- [ ] 修改服务器回应POST请求的操作，由send(JSON)修改为跳转到对应提示页面，并在一定时间后跳转到下一个页面，随后取出register.html中hidden-iframe和target以及js中相关内容
- [x] 验证码5分钟有效期设置
- [x] 细化userModel的模型(上次连接时间等)  
- [x] 设置专用邮箱发送验证码
- [ ] 测试login的API
- [ ] 添加404和500错误的处理(https://www.expressjs.com.cn/en/starter/faq.html; https://github.com/expressjs/express/tree/master/examples/error-pages)
- [ ] 组织路由结构(https://www.expressjs.com.cn/en/starter/faq.html)