// pages/my/my.js

var thttp_utils = require('../../utils/thttp_utils.js');
var that = null;

var et_input = [];

var parm = {
    userInfo: getApp().globalData.userInfo,
    file_url: getApp().globalData.file_url
};

Page({

    click_play_rec: function (e) {
        var s_url = '../video_record/video_record';
        wx.navigateTo({
            url: s_url
        });
    },

    click_favourite: function (e) {
        var s_url = '../my_fav/my_fav';
        wx.navigateTo({
            url: s_url
        });
    },

    click_about: function (e) {
        var s_url = '../show_web/show_web?url=' + getApp().globalData.base_url;
        wx.navigateTo({
            url: s_url
        });
    },

    click_notice: function (e) {
        var s_url = '../show_web/show_web?url=' + getApp().globalData.base_url + "/notice";
        wx.navigateTo({
            url: s_url
        });
    },

    /**
     * 页面的初始数据
     */
    data: parm,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
        parm.userInfo = getApp().globalData.userInfo;
        that.setData(parm);
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
        return {
            title: '留学的真相',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
});