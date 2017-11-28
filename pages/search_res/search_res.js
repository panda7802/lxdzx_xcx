// pages/search_res.js
var thttp_utils = require('../../utils/thttp_utils.js');
var that = null;

var et_input = [];

var parm = {
    video_list: [],
    curr_url: "",
    file_url: getApp().globalData.file_url
};

var curr_page = 0;
var page = 100;

/**
 * 根据标签搜索
 */
function get_list_by_tag(tag) {
    // 127.0.0.1:8000/get_video_by_tag?parm={"tag":1,"page":0,"rows":1}
    var dict = [];
    dict['tag'] = tag;
    dict['page'] = curr_page;
    dict['rows'] = page;
    thttp_utils.sendModel("get_video_by_tag", dict, function (res) {
        parm.video_list = res;
        that.setData(parm);
    }, null);
}

/**
 * 根据单词搜索
 */
function get_list_by_gjz(gjz) {
    var dict = [];
    dict['gjz'] = gjz;
    dict['page'] = curr_page;
    dict['rows'] = page;
    thttp_utils.sendModel("get_video_by_gjz", dict, function (res) {
        parm.video_list = res;
        that.setData(parm);
    }, null);
}

Page({

    /**
     * 页面的初始数据
     */
    data: parm,

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
        console.log(options);
        if ("1" === options.type) {//根据类型搜索
            get_list_by_tag(options.tag);
        } else if ("2" === options.type) {//根据关键字搜素
            get_list_by_gjz(options.gjz);
        }
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