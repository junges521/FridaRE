import frida
import sys
rdev = frida.get_remote_device()
session = rdev.attach("cn.wjdiankong.fridaandroid")

scr = """
Java.perform(function () {

//********************************hook java***********************************//
var comm = Java.use("cn.wjdiankong.fridaandroid.Utils");
var coinClass = Java.use("cn.wjdiankong.fridaandroid.CoinMoney");
var clazz = Java.use('java.lang.Class');
var Exception = Java.use("java.lang.Exception");

//hook constructor method
coinClass.$init.overload("int", "java.lang.String").implementation = function(money, value){
	send("money:"+money+",value:"+value);
	arguments[0] = 12;
	arguments[1] = "12.0";
	return this.$init(12, "12.0");
};

//hook overload method
comm.getPwd.overload("java.lang.String").implementation = function(){
	//get args after change result value
    var arg = arguments[0];
    send("pwd arg:"+arg);

    //get StatckInfo after use cmd: "adb logcat -s AndroidRuntime"
	//throw Exception.$new("CoinMoney Constructor Exception...");

    //change args and result value
    return this.getPwd("jiangwei212") + "yyyy";
};

comm.getPwd.overload().implementation = function(){
    return this.getPwd()+"xxxx";
};

comm.getCoin.implementation = function(){
	//new Object have many style
	//var coinObj = coinClass.$new.overload("int", "java.lang.String").call(coinClass, 2, "2.0");
	var coinObj = coinClass.$new(2, "2.0");
	coinObj.setExtMoney(22);
	return coinObj;
};

comm.getCoinMoney.overload("cn.wjdiankong.fridaandroid.CoinMoney").implementation = function(){
	var coin = arguments[0];
	send("coin obj:"+coin);

	//call public method
	var money = coin.getMoney();
	send("getCoinMoney money:"+money);

	//get public field
	var money1 = coin.money;
	send("money field:"+money1);

	//reflect field to get value
	var money_field_name = Java.cast(coin.getClass(), clazz).getDeclaredField("money");
	money_field_name.setAccessible(true);
    send("reflect money field:"+money_field_name.get(coin));
    //reflect field to set value
    money_field_name.setInt(coin, 101);

	//get private field
	var extmoney = coin.extMoney;
	send("extmoney field:"+extmoney);

	//reflect field to get value
	var value_field_name = Java.cast(coin.getClass(), clazz).getDeclaredField("value");
	value_field_name.setAccessible(true);
    send("reflect extmoney field:"+value_field_name.get(coin));
    //reflect field to set value
    value_field_name.set(coin, "101");

	//call private method
	var extmoney1 = coin.getExtMoney();
	send("getExtMoney money:"+extmoney1);
	var money2 = coin.getMoney();
	send("getMoney money:"+coin.getMoney());

	return this.getCoinMoney(coin);
	
};
//****************************************************************************//

//********************************hook native*********************************//
//hook export function
var nativePointer = Module.findExportByName("libcore.so" , "Java_com_yxcorp_gifshow_util_CPU_getMagic");
send("gif native pointers:"+nativePointer);
//create JNIEnv.NewStringUTF Function
//var newStringFunc = new NativeFunction(fun_pointer, 'pointer', ['pointer', 'pointer']);
var envPointer;
Interceptor.attach(nativePointer, {
    onEnter: function(args) {
    	envPointer = args[0];
    	send("gifcore so args: "+args[0]+",    "+args[1]+",    "+args[2]+",    "+args[3]);
    },
    onLeave:function(retval){
    	send("gifcore so result value: "+retval);
    	//var strPointer = Memory.allocUtf8String("XXXXXXX");
    	//return newStringFunc(envPointer, strPointer);
    }
});

//hook unexport function
var nativePointer = new NativePointer(0x7816F071);
send("net native pointers:"+nativePointer);
var result_pointer;
Interceptor.attach(nativePointer, {
    onEnter: function(args) {
    	result_pointer = args[2].toInt32();
    	send("netcrypt so args: "+Memory.readCString(args[0])+",    "+args[1]+",    "+args[2]);
    },
    onLeave:function(retval){
    	//memory alloc string
    	var resultPointer = new NativePointer(result_pointer);
    	var arybuffer = Memory.readByteArray(resultPointer, 16);
    	var intary = new Uint32Array(arybuffer);
    	var resultstr = "";
    	for(var i=0;i<intary.length;i++){
    		send("hex:"+intary[i].toString(16));
    		resultstr = resultstr + revertHex(intary[i].toString(16));
    	}
    	send("netcrypt result pointer:"+resultPointer+", result:"+resultstr);

    	//change result 1111
    	for(var i=0;i<intary.length;i++){
    		intary[i] = 1;
    	}
    	Memory.writeByteArray(resultPointer, arybuffer);
    }
});

function revertHex(hexStr){
	var str = "";
	str = str + hexStr[6];
	str = str + hexStr[7];
	str = str + hexStr[4];
	str = str + hexStr[5];
	str = str + hexStr[2];
	str = str + hexStr[3];
	str = str + hexStr[0];
	str = str + hexStr[1];
	return str;
}
//****************************************************************************//

});
"""

script = session.create_script(scr)
def on_message(message ,data):
    print message
script.on("message" , on_message)
script.load()
sys.stdin.read()