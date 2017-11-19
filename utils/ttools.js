// ttools.js
// var util = require('./util.js');
var tconst = require('./t_const.js')

function deb(msg) {
    console.log(date_format(new Date(), "yyyy-MM-dd HH:mm:ss") + "  " + msg);
}

function err(msg) {
    console.error(date_format(new Date(), "yyyy-MM-dd HH:mm:ss") + "  " + msg);
}

function is_null(obj) {
    try {
        if ((null === obj) || (obj.length <= 0)) {
            return true;
        }
    } catch (e) {
        return true;
    }
    return false;
}

function toast_show_err(s) {
    wx.showToast({
        title: s,
        icon: 'loading',
        duration: 1000
    })
}

/**
 * 登录
 */
function gotoLogin() {
    deb("--跳转到登录---");
    wx.navigateTo({
        url: '../login/login'
    })
}

/**
 * 日期格式化
 */
function date_format(dt, fmt) { //author: meizz 
    var o = {
        "M+": dt.getMonth() + 1, //月份 
        "d+": dt.getDate(), //日 
        "h+": dt.getHours(), //小时 
        "m+": dt.getMinutes(), //分 
        "s+": dt.getSeconds(), //秒 
        "q+": Math.floor((dt.getMonth() + 3) / 3), //季度 
        "S": dt.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


function get_str_len(str) {
    var l = str.length;
    var blen = 0;
    for (var i = 0; i < l; i++) {
        if ((str.charCodeAt(i) & 0xff00) != 0) {
            blen++;
        }
        blen++;
    }
    return blen;
}

module.exports = {
    deb: deb,
    err: err,
    gotoLogin: gotoLogin,
    is_null: is_null,
    toast_show_err: toast_show_err,
    date_format: date_format,
    get_str_len: get_str_len
};

