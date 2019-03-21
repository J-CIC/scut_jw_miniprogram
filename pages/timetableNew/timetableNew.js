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
        var t = e.detail.value.xh, a = e.detail.value.pwd;
        "" != t && "" != a ? (wx.getStorageSync("remember2") && (wx.setStorageSync("xh2", t), 
        wx.setStorageSync("pwd2", a)), this.DoLogin(t, a)) : this.showMsg("账号或密码不能为空");
    },
    DoLogin: function(e, t) {
        var a = this;
        a.setData({
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
                }), a.getClass(e, t.header["Set-Cookie"])) : a.showMsg("登录失败，请重新登录") : a.showMsg(t.data.err_msg) : a.showMsg("登录失败，请稍后重试");
            },
            fail: function(e) {
                a.showMsg("登录失败，请稍后重试"), wx.hideLoading();
            }
        });
    },
    getClass: function(e, t) {
        var a = this;
        wx.request({
            url: "https://score.withcic.cn/getClass2",
            data: {
                xh: e
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: t
            },
            success: function(e) {
                wx.hideLoading(), 200 == e.statusCode ? 0 == e.data.err_code ? (a.setData({
                    steps: 4
                }), wx.setStorageSync("class", e.data.data), wx.setStorageSync("week", e.data.week), 
                wx.navigateTo({
                    url: "../classResultNew/classResultNew"
                })) : a.showMsg(e.data.err_msg) : a.showMsg("查询失败，请稍后重试");
            },
            fail: function(e) {
                a.showMsg("查询失败，请稍后重试"), wx.hideLoading();
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
            var a = wx.getStorageSync("xh2"), o = wx.getStorageSync("pwd2");
            this.setData({
                xh: a,
                pwd: o,
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