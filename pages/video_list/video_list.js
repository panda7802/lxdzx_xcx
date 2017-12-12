// pages/video_list/video_list.js

var thttp_utils = require('../../utils/thttp_utils.js');
var that = null;

var et_input = [];

var parm = {
    video_list: [],
    curr_url: "",
    type: 4,
    file_url: getApp().globalData.file_url
};

var curr_page = 0;
var page = 100;


function get_video_list(type) {
    //TODO 分页
    // http://127.0.0.1:8000/get_videos_oder?parm={"type":1,"page":0,"rows":10}
    parm.type = type;
    var dict = [];
    dict['type'] = parm.type;
    dict['page'] = curr_page;
    dict['rows'] = page;
    thttp_utils.sendModel("get_videos_oder", dict, function (res) {
        parm.video_list = res;
        that.setData(parm);
    }, null);
}

function flush_view() {
    //TODO 每日推荐

    //获取播放列表
    get_video_list(parm.type);
}

Page({

    /**
     * 页面的初始数据
     */
    data: parm,

    click_type: function (e) {
        get_video_list(e.currentTarget.id)
    },

    scroll_flush: function (e) {
        console.log("刷新");
    },

    scroll_loadMore: function (e) {
    },

    click_item: function (e) {
        var vid = e.currentTarget.id;
        var s_url = '../video/video?vid=' + vid;
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
        flush_view();
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
        wx.showNavigationBarLoading(); //在标题栏中显示加载

        flush_view();

        // complete
        wx.hideNavigationBarLoading();//完成停止加载
        wx.stopPullDownRefresh();//停止下拉刷新
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