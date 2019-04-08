Page({
    data: {},
    showImage: function() {
        wx.previewImage({
            urls: [ "http://wechat.withcic.cn/DailyPush/Public/my.png"]
        });
    },
    showFeedbackImage: function() {
      var r = Math.random()
      wx.previewImage({
        urls: ["http://wechat.withcic.cn/DailyPush/Public/feedback.jpg?rand=" + r]
      });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});