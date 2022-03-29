
let getMailCode=document.getElementById("getMailCode");
let register=document.getElementById("register");
let reg_mail=document.getElementById("reg_mail");
let reg_password=document.getElementById("reg_password");
let code=document.getElementById("code");
let hidden=document.getElementById("hidden-frame");

hidden.addEventListener("load",(event)=>{
    console.log(hidden.contentWindow.document.body.innerHTML);
})

//按下获取验证码按钮
getMailCode.addEventListener("click",(event)=>{
    console.log("getMailCode");
    if(!reg_mail.validity.valid){//前端检验表单合法性
        if(reg_mail.validity.valueMissing) console.log("邮箱不能为空");
        if(reg_mail.validity.tooLong) console.log("邮箱长度过长");
        if(reg_mail.validity.patternMismatch) console.log("不符合正确的邮箱格式");
        event.preventDefault();        
    }
    if(checkNet()!==true)
    {
        console.error("无法连接到服务器");
        event.preventDefault();
    }
});

//按下注册按钮
register.addEventListener("click",(event)=>{
    console.log("register");
    if(!reg_mail.validity.valid){//邮箱
        if(reg_mail.validity.valueMissing) console.log("邮箱不能为空");
        if(reg_mail.validity.tooLong) console.log("邮箱长度过长");
        if(reg_mail.validity.patternMismatch) console.log("不符合正确的邮箱格式");
        event.preventDefault();        
    }
    if(!reg_password.validity.valid){//密码
        if(reg_password.validity.valueMissing) console.log("密码为空");
        if(reg_password.validity.patternMismatch) console.log("密码不符合要求");
        event.preventDefault();  
    }
    if(!code.validity.valid){//验证码
        console.log("请输入正确的六位数字验证码");
        event.preventDefault(); 
    }
    if((checkNet())!==true)//检查网络
    {
        console.error("无法连接到服务器");
        event.preventDefault();
    }
    
});

/**
 * 阻止表单提交后要在页面上显示出表单的问题
 * 告知用户修改表单内容
 * 不能仅在控制台输出
 */