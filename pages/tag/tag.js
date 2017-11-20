//pages/tag/tag.js

var thttp_utils = require('../../utils/thttp_utils.js');
var that = null;

var et_input = [];

var parm = {
    tag_list: [],
    file_url : getApp().globalData.file_url
};

/**
 * 获取标签列表
 */
function get_tag_list() {
    // [{"id": 1, "name": "预告片", "desc": "留学的真相预告片"}, {"id": 2, "name": "师夷记", "desc": "新版节目"}]
    var tag = "get_tags";
    thttp_utils.sendModel(tag, null, function (res) {
        parm.tag_list = res.data;
        that.setData(parm);
    }, null);
}

Page({

    /**
     * 页面的初始数据
     */
    data: parm,

    scroll_flush: function (e) {
        console.log("刷新");
        get_tag_list();
    },

    scroll_loadMore: function (e) {
    },

    click_item: function (e) {
        console.log(e)
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
