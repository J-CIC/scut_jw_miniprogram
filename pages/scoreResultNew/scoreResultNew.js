Page({
    data: {},
    onLoad: function(n) {
        var o = wx.getStorageSync("score");
        this.setData({
            scoreList: o
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});