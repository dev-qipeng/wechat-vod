var api = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var app = getApp()
Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log(wx.getStorageSync('userId'))
          if(wx.getStorageSync('userId')){
            wx.switchTab({
              url: '../index/index',
            })
          }else{
            return;
          }
        } else {
          return;
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo
      wx.login({
        success: function (res) {
          var data = {
            authCode: res.code,
            encryptedData: encodeURIComponent(e.detail.encryptedData),
            iv: encodeURIComponent(e.detail.iv),
            nickname: e.detail.userInfo.nickName,
            sex: e.detail.userInfo.gender,
            headImg: e.detail.userInfo.avatarUrl,
            city: e.detail.userInfo.city
          };
          api.login.call(that, config.apiList.login, data)
        }
      })
    } else {
      wx.showModal({
        title: '无法完成登陆',
        content: '小程序需要获取您的用户信息，用于登陆。请重试登陆，并确保允许小程序获取用户资料。',
        showCancel: false
      })
    }
  }

})