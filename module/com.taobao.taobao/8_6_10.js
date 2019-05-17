Java.perform(function () {




    //hook_ProtocolParamBuilderBeforeFilter_filter();
    function hook_ProtocolParamBuilderBeforeFilter_filter(){
        var NetworkConvertBeforeFilter = Java.use("tb.lmc");
        NetworkConvertBeforeFilter.b.implementation = function(mtop){
            var result = this.b(mtop);
            console.log("result:" + result);
            var request = getFiledValue(mtop,"k");
            var headers = getFiledValue(mtop,"i");
            console.log("request:" + request);
            console.log("headers:" + headers);
            printCallback();
            return result;
        }
    }

    hook_NetworkConvertBeforeFilter_filter();
    function hook_NetworkConvertBeforeFilter_filter(){
        var NetworkConvertBeforeFilter = Java.use("tb.lmb");
        NetworkConvertBeforeFilter.b.implementation = function(mtop){
            var result = this.b(mtop);
            var request = getFiledValue(mtop,"k");
            var headers = getFiledValue(mtop,"i");
            console.log("request:" + request);
            console.log("headers:" + headers);
            printCallback();
            return result;
        }
    }

    //hook_AbstractFilterManager_handleRequest();
    function hook_AbstractFilterManager_handleRequest(){
        var AbstractFilterManager = Java.use("tb.lmj");
        AbstractFilterManager.a.overload('java.lang.String', 'mtopsdk.framework.domain.a').implementation = function(str, mtop){
            var request = getFiledValue(getFiledValue(mtop,"o"),"request");
            console.log("jmp:" + request);
            console.log("mtop:"+getFiledValue(request, "dataParams"));
            this.a(str, mtop);
            console.log("mtop:"+getFiledValue(mtop,"k"));
            console.log("mtop:"+getFiledValue(mtop,"j"));
            //printCallback();
        }
    }


    //hook_AbstractNetworkConverter_buildRequestHeaders();
    function hook_AbstractNetworkConverter_buildRequestHeaders(){
        var AbstractNetworkConverter = Java.use("mtopsdk.mtop.protocol.converter.impl.AbstractNetworkConverter");
        AbstractNetworkConverter.buildRequestHeaders.implementation = function(map, map2, z){
            console.log("map:  "+map);
            console.log("map2: "+map2);
            console.log("z:    "+z );
            var newMap = this.buildRequestHeaders(map, map2, z);
            console.log(""+newMap);
            printCallback();
            return newMap;
        }
    }

    hook_InnerSignImpl_signRequest();
    function hook_InnerSignImpl_signRequest(){
        var InnerSignImpl = Java.use("tb.lmu");
        InnerSignImpl.a.overload('java.util.HashMap', 'java.lang.String', 'java.lang.String').implementation = function(hashMap, appkey, a){
            var sign = this.a(hashMap, appkey, a);
            console.log("hashMap:"+hashMap);
            console.log("appkey:" +appkey);

            console.log("sign:"+sign);
            printCallback();
            return sign;
        }
    }

    //hook_SecureSignatureComponent_signRequest();
    function hook_SecureSignatureComponent_signRequest(){
        var SecureSignatureComponent = Java.use("com.alibaba.wireless.security.open.securesignature.a");
        SecureSignatureComponent.signRequest.implementation = function(securityGuardParamContext, str){
            var sign = this.signRequest(securityGuardParamContext, str);
            console.log("securityGuardParamContext:"+securityGuardParamContext);
            console.log("str:"+str);
            console.log("sign:"+sign);
            printCallback();
            return sign;
        }
    }


    //hook_InnerProtocolParamBuilderImpl_buildParams();
    function hook_InnerProtocolParamBuilderImpl_buildParams(){
       var InnerProtocolParamBuilderImpl = Java.use("mtopsdk.mtop.protocol.builder.impl.InnerProtocolParamBuilderImpl");

       InnerProtocolParamBuilderImpl.buildParams.implementation = function(ppb){
            var map = this.buildParams(ppb);
            var mtopConfig = getFiledValue(this,"mtopConfig");
            console.log("mtopConfig:"+mtopConfig);
            console.log("sss:"+getFiledValue(mtopConfig, "sign"));
            //printCallback();
            console.log(map);
            return map;
        }
    }

    //hook_ProtocolParamBuilderBeforeFilter_ctor();

    function hook_ProtocolParamBuilderBeforeFilter_ctor(){
        var ProtocolParamBuilderBeforeFilter = Java.use("tb.lmc");
        ProtocolParamBuilderBeforeFilter.$init.implementation = function(ppb){
            console.log(ppb);
            printCallback();
        }
    }

    //hook_AbstractNetworkConverter_convert();
    function hook_AbstractNetworkConverter_convert(){
        var AbstractNetworkConverter = Java.use("mtopsdk.mtop.protocol.converter.impl.AbstractNetworkConverter");

        AbstractNetworkConverter.convert.implementation = function(bus){
            console.log(""+getFiledValue(bus,"i"));
            console.log(""+getFiledValue(bus,"m"));
            console.log(""+getFiledValue(bus,"k"));
            var request = this.convert(bus);
            console.log(""+request);
            printCallback();
            return request;
        }
    }

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
});