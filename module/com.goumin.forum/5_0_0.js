 Java.perform(function () {

    hook_AbAbsRequestClient_request();

    function hook_AbAbsRequestClient_request(){
       var AbAbsRequestClient = Java.use("com.gm.net.client.AbsRequestClient");
       AbAbsRequestClient.request.implementation = function(requestModel){
         var url = getFiledValue(requestModel,"url");
         var params = getFiledValue(requestModel, "params");

         if(params!=null){
             console.log("params:"+params.getParamString())
         }

         console.log("url:" + url);
         console.log("requestType:" + getFiledValue(requestModel, "requestType"));
         console.log("cookies:" + getFiledValue(requestModel, "cookies"));

         var headers = getFiledValue(requestModel, "headers");
         var Array = Java.use("java.lang.reflect.Array");
         var length = Array.getLength(headers)

         console.log(""+headers +":" +length);

         for (var i=0; i<length; i++){
             var item = Array.get(headers,i);
             console.log("" + item);
             //console.log(.getName()+":" + Array.get(headers,i).getValue());
         }
         this.request(requestModel);



       }
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



    function printCallback(){
       var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
       console.log("nBacktrace:n" + bt);
    }
 });