Java.perform(function () {
    var normsgJ2CBriage = Java.use("com.tencent.mm.plugin.normsg.Normsg$J2CBridge");
    console.log(""+normsgJ2CBriage)
    normsgJ2CBriage.aa.overload("int").implementation = function(type){
        console.log("type:"+type);
        printCallback();
        return this.aa(type);
    };

    function printCallback(){
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("nBacktrace:n" + bt);
    }
//    var StringBuilder = Java.use("java.lang.StringBuilder");
//
//    StringBuilder.toString.overload().implementation = function(){
//        var str = this.toString();
//        // send("content:"+ str);
//        return str;
//    };
});