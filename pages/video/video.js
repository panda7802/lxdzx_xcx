// pages/video/video.js
var thttp_utils = require('../../utils/thttp_utils.js');
var that = null;

var et_input = [];

var parm = {
    video_model: {
        id: 0,
        desc: "",
        pic_url: "",
        video_url: "",
        title: ""
    },
    file_url: getApp().globalData.file_url
};

function play_video() {
    //添加播放记录
    // http://127.0.0.1:8000/play_video?parm={"vid":1,"pid":2}
    var dict = [];
    dict["vid"] = parm.video_model.id;
    dict["pid"] = getApp().globalData.user_id;
    thttp_utils.sendModel("play_video", dict, function (data) {

    }, null);
}

Page({

    /**
     * 页面的初始数据
     */
    data: parm,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
        var dict = [];
        // 127.0.0.1:8000/get_video_by_id?parm={"vid":1}
        dict["vid"] = options.vid;
        thttp_utils.sendModel("get_video_by_id", dict, function (data) {
            parm.video_model = data;
            that.setData(parm);
            play_video();
        }, null);
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
});