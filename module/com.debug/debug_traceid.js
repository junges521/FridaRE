
Java.perform(function () {

    hook_fgets();

    function hook_fgets(){
        send("hook hook_fgets");
        var nativePointer = Module.findExportByName("libc.so" , "fgets");
        send("fopen :" + nativePointer);
        var result_pointer;
        Interceptor.attach(nativePointer, {
            onEnter: function(args) {
                console.log(console.log(Thread.backtrace(this.context)/*
                .map(DebugSymbol.fromAddress)*/.join("\n")));
            },
            onLeave:function(retval){
                  send("retval: " + retval);
                  var result = Memory.readCString(retval);
                  var index = result.indexOf("TracerPid");
                  if (index >= 0) {
                     send("init result:" + result);
                     var index2 = result.indexOf("\t0\n");
                     if (index2 == -1){
                         Memory.writeUtf8String(retval, "TracerPid:\t0\n");
                         result = Memory.readCString(retval);
                         send("alt result:" + result);
                     }
                  }
            }
        });
    }

});