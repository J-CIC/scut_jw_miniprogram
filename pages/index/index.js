getApp();

Page({
    data: {
        elements: [ {
            title: "查课表(统一认证入口)",
            name: "timetableNew",
            showName: "timetable",
            color: "blue",
            icon: "time"
        }, {
            title: "查课表（教务入口）",
            name: "timetable",
            showName: "timetable",
            color: "blue",
            icon: "time"
        }, {
            title: "查成绩(统一认证入口)",
            name: "scoreNew",
            showName: "score",
            color: "cyan",
            icon: "form"
        }, {
            title: "查成绩（教务入口）",
            name: "score",
            showName: "score",
            color: "cyan",
            icon: "form"
        }, {
            title: "反馈",
            name: "feedback",
            showName: "feedback",
            color: "purple",
            icon: "message"
        } ]
    },
    onLoad: function() {
        wx.showShareMenu({});
    },
    onShareAppMessage: function() {
        return {
            title: "SCUT教务助手",
            path: "/pages/index/index",
            imageUrl: "../../images/dailypush.png"
        };
    }
});