// pages/video_list/video_list.js

var thttp_utils = require('../../utils/thttp_utils.js');
var that = null;

var et_input = [];

var parm = {
    video_list: [],
    curr_url: "",
    file_url : getApp().globalData.file_url
};

function get_video_list(tag_id) {
    //TODO 分页
    var tag = "get_video_by_tag/" + tag_id;
    thttp_utils.sendModel(tag, null, function (res) {
        parm.video_list = res.data;
        
        if(res.data.length > 0) {
          parm.curr_url = parm.video_list[0].video_url;
        }
        

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
        var id = e.currentTarget.id;
        parm.curr_url = parm.video_list[id].video_url;
        that.setData(parm);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;

        var tag_id = options.id;
        get_video_list(tag_id);
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
})