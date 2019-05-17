 Java.perform(function () {
    //hook_CandyUtils_candyProcessorPost();

    //hook_CandyJni_getCandyDataWithKey();

    hook_MTGuard_requestSignatureForBabel();

    //hook_ApiModelTools_a();
    //hook_MapiInterceptor_b();
    //hook_ResponseBuilder_msg();
    //hook_e_a();

    //hook_BasicModel_toJson();
    hook_SocialPicassoFeedDetailBridge_feedDetailData();

    function hook_SocialPicassoFeedDetailBridge_feedDetailData(){
        var SocialPicassoFeedDetailBridge = Java.use("com.dianping.social.bridge.SocialPicassoFeedDetailBridge");
        SocialPicassoFeedDetailBridge.feedDetailData.implementation = function(v1, v2){
            console.log("feedDetailData:" + v2);
        }
    }

    hook_SocialPicassoFeedDetailBridge_commentNotification();

    function hook_SocialPicassoFeedDetailBridge_commentNotification(){
        var SocialPicassoFeedDetailBridge = Java.use("com.dianping.social.bridge.SocialPicassoFeedDetailBridge");
        SocialPicassoFeedDetailBridge.commentNotification.implementation = function(v1, v2){
            console.log("feedDetailData:" + v2);
        }
    }



   // hook_FeedDetail_decode();

    function hook_FeedDetail_decode(){
        var FeedDetail = Java.use("com.dianping.model.FeedDetail");
        FeedDetail.decode.implementation = function( e ){
            console.log("FeedDetail : " + this);
            return this.decode();
            //console.log(" : " + this.toJson);
        };
    }

    hook_FeedDetail_ctor();

    function hook_FeedDetail_ctor(){
        var FeedDetail = Java.use("com.dianping.model.FeedDetail");

        FeedDetail.$init.overload().implementation = function(){
            console.log("FeedDetail.$init.overload()");
            this.$init();
        };
        FeedDetail.$init.overload("boolean").implementation = function(b){
            console.log("FeedDetail  b");
            printCallback();
            this.$init(b);
        };

        FeedDetail.$init.overload("boolean", "int").implementation = function(b, i){
            console.log("FeedDetail : b, i");
            this.$init(b,i);
        };
    }

    function hook_BasicModel_toJson(){
        var BasicModel = Java.use("com.dianping.model.BasicModel");
        BasicModel.toJson.implementation = function(){
          //be
          var json = this.toJson();
          console.log("" +this+ " : " + json);

          return json;
        };
    }

    function hook_e_a(){
       var e =  Java.use("com.dianping.archive.e");
        e.a.overload("com.dianping.archive.c").implementation = function(c){
            var obj = this.a(c);
            //console.log("para: "+ c)
            console.log(obj)
            return obj;
        };

    }

    //

    //hook_Decode_a();
    function hook_Decode_a(){
        var f =  Java.use("com.dianping.dataservice.mapi.impl.f");
        f.a.overload("[B").implementation = function(data){
            var newData = this.a(data);

            send(newData);

            return newData;
        };
    }



    function hook_ResponseBuilder_msg() {
        var ResponseBuilder =  Java.use("com.dianping.nvnetwork.l$a");
        ResponseBuilder.a.overload("java.lang.Object").implementation =  function(msg){

           // console.log("url:" + request.d());
           // console.log("method:" + request.f());
           // console.log("method:" + request.g());
            if (msg !=null ){
                console.log("msg:" +  msg);
            }
            printCallback();
            return this.a(msg);
         };

    };

    //hook_ResponseBuilder_headers();
    function hook_ResponseBuilder_headers() {
        var ResponseBuilder =  Java.use("com.dianping.nvnetwork.l$a");
        ResponseBuilder.a.overload("java.util.HashMap").implementation =  function(msg){

            if (msg !=null ){
                console.log("msg:" +  msg);
            }
            printCallback();
            return this.a(msg);
         };

    }


    function hook_MapiInterceptor_b(){
        var MapiInterceptor =  Java.use("com.dianping.dataservice.mapi.impl.e");
        MapiInterceptor.b.overload("com.dianping.nvnetwork.l").implementation = function(response){

           // console.log("url:" + request.d());
           // console.log("method:" + request.f());
           // console.log("method:" + request.g());
            console.log("length:" +   response.h().length);
            var newResponse = this.b(response);
            //console.log("url:" +   Java.use("java.lang.String").$new(newResponse.h()) );

            console.log("simpleMsg:" +   response.k());
            return newResponse;
         };
    }




    function hook_ApiModelTools_a(){
        var ApiModelTools =  Java.use("com.dianping.apimodel.ApiModelTools");
        ApiModelTools.a.overload("com.dianping.nvnetwork.Request").implementation = function(request){

           // console.log("url:" + request.d());
           // console.log("method:" + request.f());
           // console.log("method:" + request.g());
            var newRequest = this.a(request);
            console.log("url:" + newRequest.d());
            //console.log("method:" + newRequest.f());
            console.log("method:" + newRequest.k());
            return newRequest;
            };
    }

    function hook_MTGuard_requestSignatureForBabel(){
         var MTGuard = Java.use("com.meituan.android.common.mtguard.MTGuard");
         MTGuard.requestSignatureForBabel.overload("java.lang.String", "java.lang.String", "java.lang.String", "java.lang.String", "java.lang.String", "[B").implementation =
         function(arg22, arg23, arg24, arg25, arg26, arg27){
            console.log("str1:" + arg22);
            console.log("str2:" + arg23);
            console.log("str3:" + arg24);
            console.log("str4:" + arg25);
            console.log("map5:" + arg26);
            var url = this.requestSignatureForBabel(arg22, arg23, arg24, arg25, arg26, arg27);
            console.log("str1:" + arg22);
            console.log("str2:" + arg23);
            console.log("str3:" + arg24);
            console.log("str4:" + arg25);
            console.log("map5:" + arg26);
            console.log("url:"  + url)
            return url;
        }
    }


    function hook_CandyUtils_candyProcessorPost(){
        var CandyJni = Java.use("com.meituan.android.common.candy.CandyUtils");
        console.log(CandyJni);
        console.log(CandyJni);
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
            printCallback();
            return cky;
        };
    }

    function printCallback(){
       var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
       console.log("nBacktrace:n" + bt);
    }
 });