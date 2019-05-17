Java.perform(function () {

    /*
    function hook_unpack(){
        var MMProtocalJni = Java.use("com.tencent.mm.protocal.MMProtocalJni");
        cls_MmPJni.unpack.overload(
         "com.tencent.mm.pointers.PByteArray",
         "[B",
         "[B",
         "com.tencent.mm.pointers.PByteArray",
         "com.tencent.mm.pointers.PInt",
         "com.tencent.mm.pointers.PInt",
         "com.tencent.mm.pointers.PInt",
         "com.tencent.mm.pointers.PInt"
         ).implementation = function(var1,var2,var3,var4,var5,var6,var7,var8)
        {
            printCallback();
            console.log("var1: ", var1);
            return this.unpack(var1,var2,var3,var4,var5,var6,var7,var8);
        }
    }
    */
    //hook_NetSceneAddChatRoomMember_ctor();

    //com.tencent.mm.storage

    //hook_ChatRoomStorage

    //hook_ChatRoomBase_Content();


    //hook_ModRemarkRoomNameUI_jK();

    //com.tencent.mm.chatroom.ui


    //hook_ChatroomInfoUI_onCreate();

    //hook_NetSceneBatchGetContactProfile_ctor();
    hook_SQLiteConnectionPool_open();

    function hook_SQLiteConnectionPool_open(){
        var SQLiteConnectionPool = Java.use("com.tencent.wcdb.database.SQLiteConnectionPool");
        SQLiteConnectionPool.open.overload('com.tencent.wcdb.database.SQLiteDatabase', 'com.tencent.wcdb.database.SQLiteDatabaseConfiguration',
        '[B', 'com.tencent.wcdb.database.SQLiteCipherSpec', 'int')
        .implementation = function(sqliteDatabase, sqliteDatabaseConfiguration, password, sqliteCipherSpec, n){
            console.log("password:" + byte2string(password));
            printCallback();
            return this.open(sqliteDatabase, sqliteDatabaseConfiguration, password, sqliteCipherSpec, n);
        }
    }


    function hook_NetSceneBatchGetContactProfile_ctor(){
        var NetSceneBatchGetContactProfile = Java.use("com.tencent.mm.plugin.qmessage.a.b");
        NetSceneBatchGetContactProfile.$init.implementation = function(set){
            console.log("set:"+set);
            printCallback();
        }
    }



    function hook_ChatroomInfoUI_onCreate(){
        var ChatroomInfoUI = Java.use("com.tencent.mm.chatroom.ui.ChatroomInfoUI");
        ChatroomInfoUI.onCreate.overload("android.os.Bundle").implementation = function(bundle){
            console.log("hook_ChatroomInfoUI_onCreate:");
            this.onCreate(bundle);
            var roomid = getFiledValue(this,"dUy");
            var contract = getFiledValue(this,"dUU");
            console.log("roomid:" + roomid);
            console.log("contract:" + contract);
            var city = getFiledValue(contract,"xjL");
            console.log("city:"+contract.getProvince());
        }
    }



    function hook_ModRemarkRoomNameUI_jK(){
        var ModRemarkRoomNameUI = Java.use("com.tencent.mm.chatroom.ui.ModRemarkRoomNameUI");
        ModRemarkRoomNameUI.jK.implementation = function(roomName){
            //console.log("RoomName:" + roomName);

            //console.log("dUy:" + getFiledValue(this, "dUy"));
            this.jK(roomName);

        }

        var DefaultChatRoom = Java.use("com.tencent.mm.chatroom.a");
        DefaultChatRoom.M.implementation = function(str1, str2){
            console.log("str1:" + str1);
            console.log("str2:" + str2);
            //console.log("dUy:" + getFiledValue(this, "dUy"));
            printCallback();
            return this.M(str1, str2);

        }
    }


    //hook_ChatroomMembersLogic_getDisplayNameInRoom();
    function hook_ChatroomMembersLogic_getDisplayNameInRoom(){
         var ChatroomMembersLogic = Java.use("com.tencent.mm.model.m");
         ChatroomMembersLogic.ab.implementation = function(str1, str2){
            var display = this.ab(str1, str2);
            console.log("dispay:"+str1);
            console.log("display:"+str2);
            console.log("display:"+display);
            return  display;
        };
    }


    function hook_ChatRoomBase_Content(){
        var ChatRoomBase = Java.use("com.tencent.mm.g.c.am");
        ChatRoomBase.FL.implementation = function(){
                res = this;
                console.log("display:"+getFiledValue(res, "field_displayname"));
                console.log("display:"+getFiledValue(res, "field_chatroomname"));
                console.log("display:"+getFiledValue(res, "field_chatroomnick"));
                console.log("display:"+getFiledValue(res, "field_chatroomnotice"));
                console.log("display:"+getFiledValue(res, "field_chatroomnoticeEditor"));
                console.log("display:"+getFiledValue(res, "field_memberlist"));
                console.log("display:"+getFiledValue(res, "field_roomowner"));
                console.log("display:"+getFiledValue(res, "field_selfDisplayName"));
                console.log("display:"+getFiledValue(res, "wQl"));
            printCallback();
        }

    }




    hook();
    function hook(){
         var NetSceneVerifyUser = Java.use("com.tencent.mm.chatroom.c.h");
            NetSceneVerifyUser.$init.overload('java.lang.String', 'java.util.List', 'int').implementation =
                function(s, list, n){
              //  af v1 = g.L(c.class).VR();
                var g = Java.use("com.tencent.mm.kernel.g");
                var c = Java.use("com.tencent.mm.plugin.chatroom.a.c");
                var Class = Java.use("java.lang.Class");
                var x = Class.forName("com.tencent.mm.plugin.chatroom.a.c");
                //Class clazz = Class.forName(className);
                var gl = g.L(x);
                var cGL = Java.cast(gl, Java.use("com.tencent.mm.plugin.chatroom.a"));
                console.log("gl:"+cGL);
                var res = cGL.VR();


                res = res.nB(s);

                console.log("display:"+getFiledValue(res, "field_displayname"));
                console.log("display:"+getFiledValue(res, "field_chatroomname"));
                console.log("display:"+getFiledValue(res, "field_chatroomnick"));
                console.log("display:"+getFiledValue(res, "field_chatroomnotice"));
                console.log("display:"+getFiledValue(res, "field_chatroomnoticeEditor"));
                console.log("display:"+getFiledValue(res, "field_memberlist"));
                console.log("display:"+getFiledValue(res, "field_roomowner"));
                console.log("display:"+getFiledValue(res, "field_selfDisplayName"));
                console.log("display:"+getFiledValue(res, "wQl"));
                printCallback();
            }
    }

    function hook_NetSceneAddChatRoomMember_ctor(){
        var NetSceneVerifyUser = Java.use("com.tencent.mm.chatroom.c.e");
        NetSceneVerifyUser.$init.overload().implementation = function(arg11, arg12, arg13, arg14, arg15, arg16, arg17, arg18, arg19){
           console.log("nBacktrace:n" + bt);
        }


    }


    function hook_NetSceneVerifyUser_ctor(){
        var NetSceneVerifyUser = Java.use("com.tencent.mm.pluginsdk.model.m");
        NetSceneVerifyUser.$init.overload().implementation = function(arg11, arg12, arg13, arg14, arg15, arg16, arg17, arg18, arg19){
           console.log("nBacktrace:n" + bt);
        }
    }

    function printCallback(){
        var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("nBacktrace:n" + bt);
    }

    function byte2string(buf){
        return Java.use("java.lang.String").$new(buf);
    }

    function getFiledValue(obj, name){
        var clazz = Java.use('java.lang.Class');
        var targerclass = Java.cast(obj.getClass(), clazz);
        console.log(targerclass);
        var field = targerclass.getDeclaredField(name);
        console.log(field);
        field.setAccessible(true);
        return field.get(obj)
    }
});