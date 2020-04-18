var api = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
  data: {
    baseUrl: config.baseUrl,
    videoId: '',
    filmDetail: {},
    showLoading: true,
    showContent: false,
    commentList: [],
    inputValue: '',
    disabled: true,
    like: false
  },
  onLoad: function (options) {
    var that = this
    var id = options.id
    that.setData({
      videoId: id
    })
    api.fetchCommentList.call(that, config.apiList.commentList, id, function (data) {

    });
    api.fetchFilmDetail.call(that, config.apiList.detail, id, function (data) {

    })
    api.addHistory.call(that, config.apiList.addHistory, id)
  },

  // 收藏
  addFavorite: function(e){
    var id = e.currentTarget.dataset.id
    var that = this;
    var param = {
      userId: wx.getStorageSync('userId'),
      videoId: that.data.videoId
    }
    api.addCollection.call(that, config.apiList.addCollection, param, function (data) {

    })
  },
  // 取消收藏
  disFavorite: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this;
    var param = {
      userId: wx.getStorageSync('userId'),
      videoId: that.data.videoId
    }
    api.disCollection.call(that, config.apiList.disCollection, param, function (data) {

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
    var param = {
      userId: userId,
      videoId: that.data.videoId,
      content: inputValue
    }
    api.addComment.call(that, config.apiList.addComment, param, function (res) {
      api.fetchCommentList.call(that, config.apiList.commentList, that.data.videoId, function (data) {

      });
    })
  },
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我在看['+that.data.filmDetail.name+'],一起来看吧！',
      path: '/page/filmDetail?id=' + that.data.filmDetail.id
    }
  }
})