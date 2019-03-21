Page({
    data: {
        picker: [ "周一", "周二", "周三", "周四", "周五", "周六", "周日", "未安排", "全部" ]
    },
    onLoad: function(e) {
        var t = (new Date().getDay() + 6) % 7, n = wx.getStorageSync("week");
        this.setData({
            index: t,
            week: n
        }), this.filterDate(t);
    },
    PickerChange: function(e) {
        this.setData({
            index: e.detail.value
        }), this.filterDate(e.detail.value);
    },
    filterDate: function(e) {
        for (var t = this, n = wx.getStorageSync("class"), a = t.data.picker, i = [], o = 0; o < a.length; o++) i.push([]);
        for (var s = 0; s < n.length; s++) {
            for (var r = 0; r < a.length; r++) if (-1 !== n[s].time.indexOf(a[r])) {
                i[r].push(n[s]);
                break;
            }
            r == a.length && i[7].push(n[s]), i[8].push(n[s]);
        }
        t.setData({
            scoreList: i[e]
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