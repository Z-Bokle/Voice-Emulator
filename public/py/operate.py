import sys, json
 
def main():
    msg = sys.argv[1]

    #后面需要用到的变量直接调用，并在前面加上类似 a = sys.argv[n] 的初始化
    #下标n代表传进来的参数序号，从1开始(0是被运行的python文件名)
    #需要什么直接在前面声明，并作为外部传入参数直接获取就行，到时候我会根据你用到的参数情况，直接从node把需要的参数传进来
 
if __name__ == '__main__':
    main()