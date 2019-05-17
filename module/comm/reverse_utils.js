function printCallback(){
   var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
   console.log("nBacktrace:n" + bt);

}

function getFiledValue(obj, name){
    var clazz = Java.use('java.lang.Class');
    var targerclass = Java.cast(obj.getClass(), clazz);
    var field = targerclass.getField(name);
    field.setAccessible(true);
    return field.get(obj)
}

function setFiledValue(obj, name, value){
    var clazz = Java.use('java.lang.Class');
    var targerclass = Java.cast(obj.getClass(), clazz);
    var field = targerclass.getField(name);
    field.setAccessible(true);
    field.get(obj, value);
}
function byte2string(buf){
    return Java.use("java.lang.String").$new(buf);
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
        }
    });
}
