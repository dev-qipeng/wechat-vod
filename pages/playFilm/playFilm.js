var api = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
  data: {
      videoId:'',
      filmDetail: {},
      showLoading: true,
      showContent: false,
      commentList: [],
      inputValue: '',
      disabled: true
  },
  onLoad: function(options) {
    var that = this
    var id = options.id
    api.fetchCommentList.call(that, config.apiList.commentList, id, function (data) {

    });
    api.fetchFilmDetail.call(that, config.apiList.detail, id, function(data){
      
    })
  },

  inputText: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  inputFocus: function (e) {
    this.setData({
      disabled: false
    })
  },
  // 发表评论
  sendComment: function () {
    var that = this;
    var inputValue = that.data.inputValue;
    var userId = wx.getStorageSync('userId');
    if (inputValue === "" || inputValue === null) {
      wx.showModal({
        title: '提示',
        content: '请输入评论内容',
        showCancel: false
      })
      return;
    }
    var param = {
      userId: userId,
      videoId: that.data.videoId,
      content: inputValue
    }
    api.addComment.call(that, config.apiList.addComment, param, function (res) {

      if (res.data.result == 1) {
        api.fetchCommentList.call(that, config.apiList.commentList, that.data.videoId, function (data) {

        });
        that.setData({
          inputValue: ""
        })
      }
    });

  },
})