getApp();

Page({
    data: {
        basicsList: [ {
            icon: "usefullfill",
            name: "填写账号"
        }, {
            icon: "radioboxfill",
            name: "自动登录"
        }, {
            icon: "roundclosefill",
            name: "错误"
        }, {
            icon: "roundcheckfill",
            name: "完成"
        } ],
        steps: 0
    },
    submitForm: function(e) {
        var t = e.detail.value.xh, o = e.detail.value.pwd;
        "" != t && "" != o ? (wx.getStorageSync("remember2") && (wx.setStorageSync("xh2", t), 
        wx.setStorageSync("pwd2", o)), this.DoLogin(t, o)) : this.showMsg("账号或密码不能为空");
    },
    DoLogin: function(e, t) {
        var o = this;
        o.setData({
            steps: 1
        }), wx.showLoading({
            title: "自动登录中",
            mask: !0
        }), wx.request({
            url: "https://score.withcic.cn/login2",
            data: {
                xh: e,
                pwd: t
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 == t.statusCode ? 0 == t.data.err_code ? t.data.data ? (wx.showLoading({
                    title: "查询中",
                    mask: !0
                }), o.getScore(e, t.header["Set-Cookie"])) : o.showMsg("登录失败，请重新登录") : o.showMsg(t.data.err_msg) : o.showMsg("登录失败，请稍后重试");
            },
            fail: function(e) {
                o.showMsg("登录失败，请稍后重试"), wx.hideLoading();
            }
        });
    },
    getScore: function(e, t) {
        var o = this;
        wx.request({
            url: "https://score.withcic.cn/getScore2",
            data: {
                xh: e
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: t
            },
            success: function(e) {
                wx.hideLoading(), 200 == e.statusCode ? 0 == e.data.err_code ? (o.setData({
                    steps: 4
                }), wx.setStorageSync("score", e.data.data), wx.navigateTo({
                    url: "../scoreResultNew/scoreResultNew"
                })) : o.showMsg(e.data.err_msg) : o.showMsg("查询失败，请稍后重试");
            },
            fail: function(e) {
                o.showMsg("查询失败，请稍后重试"), wx.hideLoading();
            }
        });
    },
    showMsg: function(e) {
        this.setData({
            modalName: "Modal",
            msg: e,
            steps: 2
        });
    },
    changeSwitch: function(e) {
        wx.setStorageSync("remember2", e.detail.value), e.detail.value ? (this.showMsg("账号信息仅存储于小程序本地，服务端不会做存储"), 
        this.setData({
            steps: 0
        })) : (wx.setStorageSync("xh2", ""), wx.setStorageSync("pwd2", ""));
    },
    hideModal: function(e) {
        this.setData({
            modalName: null
        });
    },
    onLoad: function(e) {
        var t = wx.getStorageSync("remember2");
        if (t) {
            var o = wx.getStorageSync("xh2"), a = wx.getStorageSync("pwd2");
            this.setData({
                xh: o,
                pwd: a,
                remember: t
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});