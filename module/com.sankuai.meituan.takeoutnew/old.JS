
    /*
     Interceptor.attach(baseaddr.add(0x80F8).or(1), {
        onEnter: function(args) {
             console.log("out：sub_813");
        },
        onLeave:function(retval){
            console.log("out：sub_813");
        }
    });

    Interceptor.attach(baseaddr.add(0x80C8).or(1), {
        onEnter: function(args) {
        //     console.log("int：sub_80C8");
        },
        onLeave:function(retval){
            //console.log("out：");
            //console.log(Memory.readCString(retval));
           // console.log(Thread.backtrace(this.context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join("\n"));
        }
    });


      Interceptor.attach(baseaddr.add(0x10868).or(1), {
        onEnter: function(args) {
             //console.log("int：sub_10868");
        },
        onLeave:function(retval){
            //console.log("out：sub_10868");
            //console.log(Memory.readCString(retval));
           // console.log(Thread.backtrace(this.context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join("\n"));
        }
    });

    Interceptor.attach(baseaddr.add(0x1c0d0).or(1), {
        onEnter: function(args) {
           //send(Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n"));
           var value = args[1];
           //send("in: "+Memory.readCString(Memory.readPointer(value)));
        },
        onLeave:function(retval){
           //send("_SKCY: "+Memory.readCString(retval)+"\r\n");
        }
     });

      Interceptor.attach(baseaddr.add(0x97B8).or(1), {
        onEnter: function(args) {
           // var bytes     = args[0];
           // var data = Memory.readByteArray(bytes, 8);
           //console.log("in:");
        },
        onLeave:function(retval){
          // console.log(""+retval)
          //console.log("method"+Memory.readPointer(retval.add(8)).sub(baseaddr));

        }
     });

     Interceptor.attach(baseaddr.add(0x26878).or(1), {
        onEnter: function(args) {
           console.log("ZIP:");
        },
        onLeave:function(retval){
           //console.log("_SKCY:"+Memory.readCString(retval) );

        }
     });
    */

        function hook_PatchProxy_accessDispatch(){
        var patchProxy = Java.use("com.meituan.robust.PatchProxy");
        patchProxy.accessDispatch.overload(
          '[Ljava.lang.Object;', 'java.lang.Object', 'com.meituan.robust.ChangeQuickRedirect', 'boolean', 'java.lang.String', '[Ljava.lang.Class;', 'java.lang.Class'
        ).implementation = function(objArr, obj, changeQuickRedirect, z, str,  clsArr, cls){
            console.log("str:"+ str);

        };

        patchProxy.isSupport.overload(
          '[Ljava.lang.Object;', 'java.lang.Object', 'com.meituan.robust.ChangeQuickRedirect', 'boolean', 'java.lang.String','long',
          '[Ljava.lang.Class;', 'java.lang.Class').implementation = function(objArr, obj, changeQuickRedirect, z, str, l, clsArr, cls){

          var b = this.isSupport(objArr, obj, changeQuickRedirect, z, str, l, clsArr, cls);
          if(str=="2dffedc8f708127a43dda028eef84259"){
            console.log("str:"+ str +"b:" + b);
          }
        }
    }
