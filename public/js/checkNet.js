let checkNet = () => {
    let xhr = new XMLHttpRequest();
    try {
        xhr.open("GET", "/users/checkNet", false); //同步编程逻辑，不需要异步
        xhr.send(null); //无需传值，若正常会返回200
    } catch (err) {
        console.error(err);
        return false;
    }
    if (xhr.status === 200) return true;
    else return false;

}