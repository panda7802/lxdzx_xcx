var that = null;


/**
 * 名称必须与global的字段名相同
 * @param name
 * @param def_value
 */
function initSave(name, def_value) {
    try {
        that.globalData[name] = wx.getStorageSync(name);
    } catch (e) {
        console.error(e);
        that.globalData[name] = def_value;
    }
}

function initCarList() {
    var sList = wx.getStorageSync("tag_car_list", "");
    that.globalData.car_list = [];
    if (sList.length > 0) {
        var sCarLists = sList.split(",");
        if ((null !== sCarLists) && (sCarLists.length > 0)) {
            for (var i in sCarLists) {
                that.globalData.car_list.push(sCarLists[i]);
            }
        }
    }
}

/**
 * 初始化数据
 */
function initData() {
    console.log("-------initData-------");
    initSave("user_name", "");
    initSave("pwd", "");
    initSave("self_login", false);
    initSave("login_ip", "");
    initSave("login_port", 0);
    initSave("session", 0);
    console.log(that.globalData);
}

/**
 * 初始化
 */
function init(app) {
    if (null !== app) {
        that = app;
    }
    console.log("-------init-------");
    initData();
    initCarList();
}


/**
 * 清空
 */
function clearAll() {
    wx.setStorageSync('tag_car_list', '');
    wx.setStorageSync('user_name', '');
    wx.setStorageSync('pwd', '');
    wx.setStorageSync('self_login', false);
    wx.setStorageSync('login_ip', '');
    wx.setStorageSync('login_port', '');
    wx.setStorageSync('session', '');

}

module.exports = {
    init: init,
    initData: initData,
    initCarList: initCarList,
    clearAll: clearAll
};