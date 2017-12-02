// pages/video_record/video_record.js
var thttp_utils = require('../../utils/thttp_utils.js');
var that = null;

var parm = {
    video_record: [],
    file_url: getApp().globalData.file_url
};

var curr_page = 0;
var page = 100;

function get_my_fav() {
    //TODO 分页
    // http://127.0.0.1:8000/get_people_fav?parm={"vid":2,"pid":1}
    var dict = [];
    dict['vid'] = -1;
    dict['pid'] = getApp().globalData.user_id;
    dict['page'] = curr_page;
    dict['rows'] = page;
    thttp_utils.sendModel("get_people_fav", dict, function (res) {
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
        get_my_fav();
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
}) ;