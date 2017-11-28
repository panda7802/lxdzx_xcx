//pages/tag/tag.js

var thttp_utils = require('../../utils/thttp_utils.js');
var ttools = require('../../utils/ttools.js');
var that = null;

var et_input = [];

var parm = {
    tag_list: [],
    def_pic: "../../img/video_pack.png",
    file_url: getApp().globalData.file_url,
    gjz: ""
};

/**
 * 获取标签列表
 */
function get_tag_list() {
    // {"msg": "", "data": [{"id": 1, "desc": "留学的真相预告片", "pic_url": "lx.png", "title": "预告片"}, {"id": 2, "desc": "新版节目", "pic_url": "xqbqj.png", "title": "师夷记"}, {"id": 3, "desc": "vip1可以观看", "pic_url": "yugao.jpg", "title": "会员视频1"}, {"id": 4, "desc": "vip2可以观看", "pic_url": "", "title": "会员视频2"}], "success": true}
    var tag = "get_tags";
    // http://127.0.0.1:8000/get_tags?parm={"tag":1}
    var dict = [];
    dict['tag'] = -1;
    thttp_utils.sendModel(tag, dict, function (res) {
        parm.tag_list = res;
        that.setData(parm);
        console.log(parm)
    }, null);
}

Page({
    /**
     * 页面的初始数据
     */
    data: parm,

    do_query: function (e) {
        var gjz = parm.gjz;
        if (gjz.length <= 0) {
            ttools.toast_show_err("关键字不可为空");
            return;
        }
        var s_url = "../search_res/search_res?type=2&gjz=" + gjz;
        wx.navigateTo({
            url: s_url
        });
    },

    et_input_func: function (e) {
        et_input[e.currentTarget.id] = e.detail.value;

        //设置parm的名称
        var name = e.currentTarget.id;
        parm[name] = et_input[name];
    },

    click_web: function (e) {
        console.log(e)
    },

    click_tag: function (e) {
        var tag_id = parm.tag_list[e.currentTarget.id].id;
        var s_url = "../search_res/search_res?type=1&tag=" + tag_id;
        wx.navigateTo({
            url: s_url
        });
    },

    click_item: function (e) {
        console.log(e);
        var id = e.currentTarget.id;
        var s_url = '../video_list/video_list?id=' + id;
        wx.navigateTo({
            url: s_url
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        get_tag_list();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});
