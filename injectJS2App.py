import frida
import sys

def on_message(message, data):
    print(message)
    #global fileNo
    #fileNo = fileNo + 1
    #with open('file_name'+str(fileNo), 'wb+') as f:
    #    for i in message['payload']:
    #        #rint('>>>',)
    #        bytes = struct.pack('i', i)
    #        f.write(bytes)






def injectJs2App_1(processname, jsFilename):
    rdev = frida.get_remote_device()
    print(rdev)
    session = rdev.attach(processname)
    print(session)

    jsFile = open(jsFilename, "r")
    src = jsFile.read()

    script = session.create_script(src)

    script.on("message", on_message)
    script.load()
    sys.stdin.read()

def injectJs2AppBefore(processname, jsFilename):
    rdev = frida.get_usb_device()


def injectJs2App(pkgname, version):
    rdev = frida.get_remote_device()
    print(rdev)
    session = rdev.attach(pkgname)
    #pid = rdev.spawn(pkgname)
    #print(pid)
    print(session)

    jsFilename = "module/"+pkgname+"/"+ version + ".js"
    print(jsFilename)
    jsFile = open(jsFilename, mode='r', encoding='UTF-8')
    src = jsFile.read()
    script = session.create_script(src)

    script.on("message", on_message)
    script.load()
    sys.stdin.read()


if __name__ == "__main__":
    #injectJs2App('com.tencent.mm', '6_6_5.js')  # 微信App6_6_5
    #injectJs2App('com.tencent.mm', '7_0_3')   # 微信App7_0_3
    #injectJs2App('com.sankuai.meituan.takeoutnew','6.6.7') #美团外卖APP
    #injectJs2App('com.sankuai.meituan.takeoutnew','7_6_4')  # 美团外卖APP
    #injectJs2App('com.sankuai.meituan', '6_5_1') #美团APP
    #injectJs2App('com.tencent.wework', '6_4_0') #企业微信
    #injectJs2App('com.dianping.v1', "10_8_4") #大众点评
    #injectJs2App('com.goumin.forum', '5_0_0')
    injectJs2App('com.xingin.xhs', '5_22_0')
    #injectJs2App('com.husor.beidian', '3_25_01') #贝店APP
    #injectJs2App('com.taobao.taobao', '8_6_10')
