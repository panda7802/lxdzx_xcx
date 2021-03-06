//app.js

/**
 *                   _ooOoo_                        大悲人间多灾多难是也             唱此大悲咒逢凶化吉
 *                  o8888888o                       人生在世炳烛行夜是也             风来雨来均灭
 *                  88" . "88                       皈佛门青灯照夜静                 苦海无边也唯回头是岸
 *                  (| -_- |)                       一切可有可无                     大慈大悲也南无观音 菩萨啊
 *                  O\  =  /O                       救众生痴迷随缘化渡               密放神通扬洒甘露普渡有缘人
 *               ____/`---'\____                    人生多病苦                       世间百态皆苦海
 *             .'  \\|     |//  `.                  唯独看破红尘七情六欲全抛弃也     还有什么不能了
 *            /  \\|||  :  |||//  \                 不能悟不能舍                     慈颜笑对一切善哉善哉
 *           /  _||||| -:- |||||-  \                善哉善哉缘起缘灭本自然           何必何必计较
 *           |   | \\\  -  /// |   |                一切一切苦乐随缘听命             苦乐随缘善哉善哉于是也
 *           | \_|  ''\---/''  |   |                随心所至心静人静                 万事万物 静心不动
 *           \  .-\__  `-`  ___/-. /                无悲无悲无喜无喜心不变           了悟 如佛何去何从花开花落
 *            \  .-\__ `-` ___/-. /                 无我无我随心无我无我随缘         无爱无爱无恨无恨
 *         ___`. .'  /--.--\  `. . __               见愚见智不可说                   不可说不能说不能说
 *      ."" '<  `.___\_<|>_/___.'  >'"".            佛法无量济世渡人是也             心有佛一心向佛娑婆诃
 *     | | :  `- \`.`\ _ /`.`/ - ` : | |            心无我娑婆诃                     一花一世界娑婆诃
 *     \  \ `-.   \_ __\ /__ _/   .-` /  /          道是修行魔是心魔娑婆诃           修道除魔娑婆诃
 *======`-.____`-.___\_____/___.-`____.-'=======    救苦救难娑婆诃                   愿终身赴汤蹈火娑婆诃
 *                   `=---='                        历尽人间千难万险娑婆诃           哪怕是刀山火海 娑婆诃
 *^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    无私奉献我自己娑婆诃             广渡众生远离苦海娑婆诃
 *^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    返本归真也一切娑婆诃             愿得菩萨保佑早日得法南无观世音
 *^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    莲花通神法螺传声娑婆诃           普渡众生离苦海早上岸娑婆诃
 */

var that = null;
var tinit = require('./utils/t_init.js');
var thttp_utils = require('./utils/thttp_utils.js');

App({
    onLaunch: function () {
        that = this;
        tinit.init(that);
        wx.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    console.log(res)
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
        console.log("get setting ---------");
        wx.getSetting({
            success: function (res) {
                console.log(res);
                console.log("get user info ---------");
                wx.getUserInfo({
                    success: function (res) {
                        console.log("get user info res---------");
                        getApp().globalData.userInfo = res.userInfo;
                        getApp().globalData.user_name = res.userInfo.nickName;
                        console.log(getApp().globalData.userInfo);
                        var dict = [];
                        // 登录
                        // http://127.0.0.1:8000/login?parm={"wx_name":"aaa"}
                        dict["wx_name"] = getApp().globalData.user_name;
                        thttp_utils.sendModel("login", dict, function (data) {
                            getApp().globalData.user_id = data.id
                        }, null)
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        base_show_url: "https://www.pandafly.cn/lxdzx_show",
        base_url: "https://www.pandafly.cn/lxdzx",
        file_url: "https://www.pandafly.cn/static/files/recv/",
        // base_url: "http://127.0.0.1:8000/lxdzx",
        // file_url: "http://127.0.0.1:8000/static/files/recv/",
        user_name: "",
        user_id: 0
    }
});
