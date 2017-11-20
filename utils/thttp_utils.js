var tmd5 = require('./md5.js');
var ttools = require('./ttools.js');
var tbase64 = require('./base64.js');

function sign(text, key) {
    text = text + key;
    var resultString = "";
    try {
        resultString = tmd5.md5(text);
    } catch (e) {
        console.error(e);
    }
    return resultString;
}

function initHttp(cityCode) {
    initHttp(cityCode, null);
}

/**
 * 初始化HTTP请求
 */
function initHttp(cityCode, func) {
    console.log("--初始化HTTP请求");
    var url = getApp().globalData.base_url + "?";
    var parms = "fun=qMobileServiceSite&flag=1&areacode=" + cityCode + "&jkver=2";
    parms += "&appkey=" + getApp().globalData.APP_KEY + "&req=https";
    var s_sign = sign(parms, getApp().globalData.keyString);
    url += parms + "&sign=" + s_sign;
    ttools.deb("获取基本数据 ：" + url);
    wx.request({
        url: url,
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            console.log(res.data);
            if (false === res.data.success) {
                ttools.is_null(res.data.msg);
                wx.showToast({
                    title: res.data.msg,
                    icon: 'loading',
                    duration: 1000
                });
                console.error(res.data.msg);
                setTimeout(function () {
                    initHttp(cityCode, func);
                }, 2000);
                return;
            }
            var res64 = res.data.result;
            var base_str = tbase64.base64decode(res64);
            getApp().globalData.base_data = JSON.parse(base_str);
            console.log(base_str);
            if (null !== func) {
                func(res.data);
            }
        },
        fail: function (res) {
            var s = '初始化获取HTTP异常,请重新获取';
            wx.showToast({
                title: s,
                icon: 'loading',
                duration: 2000
            });
            console.error(res);
            // setTimeout(function () {
            //     initHttp(cityCode, func);
            // }, 2000);
        }
    });
}

// function isSessionInvalid(json) {
//     var res = false;
//     if (null === json) {
//         return false;
//     }
//     res = (json.indexOf("session失效,请重新登") < 0);
//     return res;
// }
//
// function get_dict(s_json) {
//     var res = [];
//     res["ak"] = "A01";
//     res["av"] = "1.0";
//     res["iv"] = "1.0";
//     res["ts"] = new Date().getTime() + "";
//     res["st"] = "MD5";
//     res["params"] = encodeURIComponent(s_json, "utf-8").replace("+", "%20");
//     res["sn"] = cal_sn(res);
//
//     return res;
// }


function cal_sn(dict) {
    var httpMethod = "GET";

    var key_arr = [];
    var i = 0;
    for (var key in dict) {
        key_arr[i] = key;
        i++;
    }
    key_arr.sort();
    var basic_buffer = httpMethod;
    for (i = 0; i < key_arr.length; i++) {
        var key = key_arr[i];
        var value = dict[key];
        basic_buffer += key + "=" + value;
    }

    var basic_string = "";
    try {
        basic_string = encodeURIComponent(basic_buffer, "utf-8").replace('+', '%20');
    } catch (e) {
        console.error(e);
    }
    basic_string += "b024dwa5f10346f1a295e6v422ed0334";
    return tmd5.md5(basic_string).substr(8, 16);
}

/**
 * 发送对象，只接收返回值为true的
 */
function sendModel(tag, dict, type, succ_func) {
    sendModel(tag, dict, type, succ_func, null);
}

/**
 * 发送对象
 */
function sendModel(tag, dict, succ_func, fail_func) {
    var s_json = "";
    var site = getApp().globalData.base_url;

    if ((null === getApp().globalData) || (null === getApp().globalData.base_data)) {
        var s = '重新初始化http';
        wx.showToast({
            title: s,
            icon: 'success',
            duration: 2000
        });
        console.error(s);
        initHttp(getApp().globalData.city_code);
        return;
    }
    if (null !== dict) {
        s_json = "{";
        var session = getApp().globalData.session;
        if ((undefined !== session) && (null !== session) && (session.length > 0)) {
            s_json += "\"token\":\"" + session + "\",";
        }

        for (var s_key in dict) {
            s_json += "\"" + s_key + "\":\"" + dict[s_key] + "\",";
        }
        s_json = s_json.substr(0, s_json.length - 1);
        s_json += "}";
        s_json = encodeURIComponent(s_json, "utf-8").replace('+', '%20');
    }
    var url2send = site + "/" + tag;
    if (s_json.length > 0) {
        url2send += +"?" + s_json;
    }
    console.log(url2send);
    wx.request({
        url: url2send,
        data: {},
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            if (false === res.data.success) {
                var s = res.data.msg;
                if (null !== s) {
                    wx.showToast({
                        title: s,
                        icon: 'loading',
                        duration: 2000
                    });
                    console.error(s);
                }
                if (null !== fail_func) {
                    fail_func(res.data);
                }
            } else {
                console.log(res.data);
                succ_func(res.data);
            }
        },
        fail: function (res) {
            var s = '异常:' + tag;
            wx.showToast({
                title: s,
                icon: 'loading',
                duration: 2000
            });
            console.error(s);
        }
    });
}


function is_inited() {
    var res = false;
    if (null !== getApp().globalData.base_data) {
        res = true;
    }
    return res;
}

module.exports = {
    initHttp: initHttp,
    // isSessionInvalid: isSessionInvalid,
    sendModel: sendModel,
    is_inited: is_inited
};
