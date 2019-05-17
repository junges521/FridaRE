Java.perform(function () {

    hook_RequestBody_create();

    function hook_RequestBody_create(){
        var RequestBody = Java.use("okhttp3.z");
        RequestBody.create.overload("okhttp3.t", "java.lang.String").implementation = function(meidaType, str){
            console.log("requestBody", str);
        };

        RequestBody.create.overload("okhttp3.t", "[B").implementation = function(meidaType, str){
            console.log("requestBody", str);
        };
    }

    function printCallback(){
       var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
       console.log("nBacktrace:n" + bt);
    }
});