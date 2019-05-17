Java.perform(function () {


   // hook_dv_a();
    hook_j_b();

    function hook_j_b(){
        var j = Java.use("c.t.m.g.j");
        j.d.overload("[B").implementation = function(a){
           var data = this.d(a);
           console.log(" : "+Java.use("java.lang.String").$new(data,"gbk"));

         // var data = Java.use("java.lang.String").$new("{\"location\":{\"latitude\":21.539986,\"longitude\":111.939785,\"altitude\":0.0,\"accuracy\":30.0},\"details\":{\"subnation\":{\"name\":\"中国,广东省,深圳市,南山区\",\"code\":\"440305\",\"nation\":\"中国\",\"province\":\"广东省\",\"city\":\"深圳市\",\"district\":\"南山区\",\"town\":\"Unknown\",\"village\":\"Unknown\",\"street\":\"深南大道\",\"street_no\":\"\",\"mergedname\":\"威盛科技大厦\",\"mergedaddr\":\"广东省深圳市南山区深南大道9966\"},\"poilist\":[{\"name\":\"威盛科技大厦\",\"addr\":\"广东省深圳市南山区深南大道9966\",\"catalog\":\"房产小区:商务楼宇\",\"dist\":\"80.0\",\"uid\":\"4745750987537080249\",\"latitude\":\"22.540689\",\"longitude\":\"113.940018\"},{\"name\":\"森那美大厦\",\"addr\":\"广东省深圳市南山区科艺路1\",\"catalog\":\"房产小区:商务楼宇\",\"dist\":\"80.0\",\"uid\":\"5078572215857301539\",\"latitude\":\"22.540510\",\"longitude\":\"113.939247\"},{\"name\":\"深圳市高新技术产业园区1栋\",\"addr\":\"广东省深圳市南山区科技园森那美大厦(深圳大学北)\",\"catalog\":\"房产小区:商务楼宇\",\"dist\":\"83.3\",\"uid\":\"5841628370865214009\",\"latitude\":\"22.540440\",\"longitude\":\"113.939140\"},{\"name\":\"深圳森那美汽车实业有限公司\",\"addr\":\"广东省深圳市南山区深南大道麻雀岭工业区森那美大厦首层\",\"catalog\":\"公司企业:公司企业\",\"dist\":\"93.8\",\"uid\":\"11885867099158177790\",\"latitude\":\"22.540621\",\"longitude\":\"113.939178\"},{\"name\":\"中钢大厦\",\"addr\":\"广东省深圳市南山区科文路9\",\"catalog\":\"房产小区:商务楼宇\",\"dist\":\"132.6\",\"uid\":\"16848732152730946702\",\"latitude\":\"22.541300\",\"longitude\":\"113.940079\"}]},\"bearing\":\"10,1,8\",\"timestamp\":\"1550830538296\",\"indoorinfo\":{\"bid\":\"\",\"floor\":\"1000\",\"type\":-1}}");

          //return ;
        }
    }

    function hook_dv_a(){
        var dv = Java.use("c.t.m.g.dv");
        dv.a.overload("java.lang.String", "c.t.m.g.ec", "int").implementation = function(str, ecVar, i){
            console.log("str:"+str);
            console.log("str:"+ecVar);
            console.log("i:" + i);
            printCallback();
            return this.a(str, ecVar, i);
        };
    }

    function printCallback(){
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("nBacktrace:n" + bt);
    }


});