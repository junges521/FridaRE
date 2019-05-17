Java.perform(function () {

    //hook overload method

    hook_SharedPreferencesImpl$EditorImpl_putString();


    /*
    var call = Java.use("com.squareup.okhttp.m");
    call.a.overload("com.squareup.okhttp.an").implementation = function(request){
        console.log("com.squareup.okhttp.m.a"+request.getClass());
        printCallback();
        return this.a(request);
    };
    var okApiAnalyzerInterceptor = Java.use("com.sankuai.meituan.common.net.okhttp.c");
    okApiAnalyzerInterceptor.intercept.overload("com.squareup.okhttp.ag").implementation = function(chain){
        var response =  this.intercept(chain);
        console.log("com.sankuai.meituan.common.net.okhttp.c.intercept")
        var body = response.g();
        console.log(body.getClass())
        if(body !=null)
        {
            var data = body.bytes();
            console.log(" response:");
        }
        return response;
    };*/

    function hook_SharedPreferencesImpl$EditorImpl_putString(){
        var editorImpl = Java.use("android.app.SharedPreferencesImpl$EditorImpl");
        editorImpl.putString.overload("java.lang.String", "java.lang.String").implementation = function(key, value){
            console.log("putString key：" + key + " value:" + value);
            if(key=="uuid"){
                printCallback();

            }
            return this.putString(key, value);
        };
    }

    function hook_SharedPreferencesImpl_getString(){
         var sharedImpl = Java.use("android.app.SharedPreferencesImpl");
         sharedImpl.getString.overload("java.lang.String", "java.lang.String").implementation = function(key, def){
             var value = this.getString(key, def);
             send("getString key：" + key + " value:" + value);
             return value;
          };
    }

    function printCallback(){
       var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
       console.log("nBacktrace:n" + bt);
    }

});