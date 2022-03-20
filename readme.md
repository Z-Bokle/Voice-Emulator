## 已使用的开源项目  
- nodejs  
- pwabuilder
- nodemailer  
- mongoDB  
- mongoose  

## 参考中的开源项目  

## 随手记录  
- 由于service worker支持离线缓存，因此无法访问DOM,故登录、注册等请求通过form实现  
- 由于提交表单时检查网络应实时进行，因此逻辑上无法采用异步编程（因为要等待GET的结果），故不采用fetch方法作为测试网络的途径，使用同步的ajax实现  
- 由于service worker体系只能工作在https协议下（本地调试可以用http）因此密码等信息可以明文传输，无需加密
- 默认开放端口为3000，如需更改需要进入./bin/www内修改  
- 由于前端传来的信息并不一定可靠，注册/登录的表单信息是否合法还需要在后端进一步验证

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
- [ ] 后端创建cookie保留登录信息  
- [ ] 后端验证表单信息合法性  
- [ ] 前端CSS配置  
- [ ] 后端验证码存储到数据库  
- [ ] 前端表单非法时给用户的提示信息  
- [ ] 服务器消息推送  
- [ ] 客户端service worker接收消息推送  
- [ ] service worker发出本地通知  
- [ ] 通过路由设置实现验证cookie后不同情况下的页面重定向  
- [ ] 修改服务器回应POST请求回传信息的方式，目前会导致页面跳转
- [x] 验证码5分钟有效期设置
- [ ] 细化userModel的模型
- [x] 设置专用邮箱发送验证码
- [ ] 设置图片验证码
- [ ] 测试login的API