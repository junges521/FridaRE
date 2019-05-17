Java.perform(function () {

   // hook_RegisterNatives();


    hook_mtguard_9268();
    //hook_9DC0();
    //hook_libc_exit();
    //hook_CandyJni_getCandyDataWithKey();
    //hook_eyz_a();
    //hook_PatchProxy_accessDispatch();
    //hook_zf_c();
    //hook_zf_a();
    //hook_rx_a()

    function hook_rx_a(){
        var rx = Java.use("rx");
        rx.a.overload("java.lang.String").implementation = function(src){

            printCallback();
            var dest = this.rx(src);
            console.log(""+src);
            console.log(""+dest);
            return dest;
        }
    }

    //hook_CandyUtils_candyProcessorPost();

    function hook_CandyUtils_candyProcessorPost(){
        var CandyJni = Java.use("com.meituan.android.common.candy.CandyUtils");

        CandyJni.candyProcessorPost.overload('android.content.Context', 'java.net.URI', '[B', 'java.lang.String', 'java.lang.String', 'java.util.Map', 'java.util.Map').implementation = function(context, uri, buffer, str1, str2, map1, map2){
            var uri = this.candyProcessorPost(context, uri, buffer, str1, str2, map1, map2);
            console.log("url:"+uri.toASCIIString());
            console.log("str1:" + str1);
            console.log("str2:" + str2);
            console.log("buffer:" +  Java.use("java.lang.String").$new(buffer));
            console.log("map1:" + map1);
            console.log("map2:" + map2);
            return uri;
        }
    }


    function hook_zf_a(){
        var a = Java.use("zj$a");
        a.a.overload("java.lang.String", "java.lang.String").implementation = function(key, value){
            console.log("key:"+key+" value:" + value);
            return this.a(key, value);
        };

        a.b.overload("java.lang.String").implementation = function(url){
            console.log("url： "+ url);
            if( url.startsWith("http://wmapi.meituan.com/api/v7/poi/homepage") ){
                printCallback();
            }
            return this.b(url);
        };
    }



    function printCallback(){
       var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
       console.log("nBacktrace:n" + bt);
    }

    function hook_RegisterNatives(){
        var env = Java.vm.getEnv();
        var handlePointer = Memory.readPointer(env.handle);
        console.log("handle:"+handlePointer);
        var nativePointer = Memory.readPointer(handlePointer.add(215 * Process.pointerSize))
        console.log("register:"+nativePointer);
        send("JNI RegisterNatives:"+nativePointer);

        Interceptor.attach(nativePointer, {
            onEnter: function(args) {
                var native_methods     = args[2];
                var native_methods_cnt = args[3];
                console.log("register native : "+args[0]+",    "+args[1]+",    "+args[2]+","+args[3]);
                for (var i=0; i<native_methods_cnt; i++)
                {
                    var method_name      = Memory.readPointer(native_methods.add(12*i));
                    var methodName       = Memory.readCString(method_name);
                    var method_signature = Memory.readPointer(native_methods.add(12*i + 4));
                    var methodSignature  = Memory.readCString(method_signature);
                    var method_address   = Memory.readPointer(native_methods.add(12*i + 8));
                    console.log("address: "+ method_address +" name: "+methodName+",    "+methodSignature);
                }
                console.log(Thread.backtrace(this.context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join("\n"));
            }
        });
    }

    function hook_mtguard_9268(){
        var baseaddr = Module.findBaseAddress("libmtguard.so");
        console.log("baseaddr:"+baseaddr);
        var outData;
        Interceptor.attach(baseaddr.add(0x9268).or(1), {
            onEnter: function(args) {
                var key       = Memory.readCString(args[0]);
                var params    = Memory.readCString(args[2]);
                var str = Memory.readCString(args[0]);
               // console.log("key:" + key);
               // console.log("keyLen:" + args[1]);
                console.log("params:" + params);
                console.log("paramsLen:" + args[3]);
                outData = args[4];
            },
            onLeave:function(retval){
                var str = Memory.readCString(retval);
                var data = Memory.readByteArray(outData, 20);
                //console.log("data:" + data);
                //console.log(hexdump(data, {offset: 0, length: 20,header: false, ansi: false}));
            }
        });
    }


    function hook_9DC0(){
     var baseaddr = Module.findBaseAddress("libmtguard.so");
     console.log("baseaddr:"+baseaddr);
     Interceptor.attach(baseaddr.add(0x9DC0).or(1), {
        onEnter: function(args) {
            var size = args[1];
            console.log("size：" + size )
            console.log(hexdump(args[0], {offset: 0, length: args[1].toInt32() ,header: false, ansi: false})+"\r\n");

        }
     });
    }

    function hook_6E95(){
        var baseaddr = Module.findBaseAddress("libmtguard.so");
        console.log("baseaddr:"+baseaddr);
        Interceptor.attach(baseaddr.add(0x6E95).or(1), {
            onEnter: function(args) {
                var bytes     = args[0];
                var data = Memory.readByteArray(bytes, 8);
               // console.log("in:" + data);
            },
            onLeave:function(retval){
                var str = Memory.readCString(retval);
                console.log("string:" + str);
            }
        });
    }

    function hook_libc_exit(){
         var exit = Module.findExportByName("libc.so" , "exit");
        console.log("native:" + exit);

        Interceptor.attach(exit , {
            onEnter: function(args) {
                console.log(Thread.backtrace(this.context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join("\n"));
            },
            onLeave:function(retval){
                //send("gifcore so result value: "+retval);
            }
        });
    }

    function hook_CandyJni_getCandyDataWithKey(){
        var CandyJni = Java.use("com.meituan.android.common.candy.CandyJni");
        CandyJni.getCandyDataWithKey.overload("java.lang.Object","[B", "java.lang.String").implementation = function(context, data, key){
            console.log("Context: "+context +" key: " + key);
            var String = Java.use("java.lang.String");
            var str = String.$new(data);
            console.log(""+ str);
            //var str = new String()
            var cky =  this.getCandyDataWithKey(context, data, key);
            console.log("cky:" + cky);
           // printCallback();
            return cky;
        };

    }

});
