import sys, json
 
def main():
    msg = sys.argv[1]

    #后面需要用到的变量直接调用，并在前面加上类似 a = sys.argv[n] 的初始化
    #下标n代表传进来的参数序号，从1开始(0是被运行的python文件名)
    #需要什么直接在前面声明，并作为外部传入参数直接获取就行，到时候我会根据你用到的参数情况，直接从node把需要的参数传进来
    
    #以上是直接传参的方法，如果需要的参数数目比较多，可以用json的形式传信息
    
    #传参具体参考https://blog.csdn.net/Ed7zgeE9X/article/details/120944262
    #python脚本运行结束后回传一个信息给node，以通知node可以将就绪的音频传回给用户
if __name__ == '__main__':
    main()