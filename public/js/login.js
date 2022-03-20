
let login=document.getElementById("login");
let mail=document.getElementById("mail");
let password=document.getElementById("password");
let form=document.getElementById("loginForm");


//按下登录按钮
register.addEventListener("click",(event)=>{
    console.log("login");
    if(!mail.validity.valid){//邮箱
        console.log("请输入正确的邮箱");
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