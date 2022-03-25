let noti=document.getElementById("notification");
if ("Notification" in window) {
    console.log("The Notifications API is supported");
}//检测通知API
window.onload=function(){
    noti.addEventListener("click", () => {
        // Notification.requestPermission().then(permission => {
        //     if (permission === "granted") {
        //         console.log("The user accepted");
        //     }
        // });
    
        console.log("sss");
        const notification = new Notification("Test Notification!", {
            body: "It's a test notification.",
            icon: "./images/icon.png",
        });
    });
}
