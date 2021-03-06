var api = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
Page({
  data: {
    baseUrl: config.baseUrl,
    films: [],
    hasMore: false,
    showLoading: false,
    pageNum: 0,
    isNull: true,
    nullTip: {
      tipText: '暂无收藏，快去浏览把',
      actionText: '去搜索',
      routeUrl: '../../pages/search/search'
    }
  },
  onLoad: function (options) {
    var that = this
    api.fetchCollectionList.call(that, config.apiList.collectionList, wx.getStorageSync('userId'), function (data) {

    });

  },

  viewFilmDetail: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: "../filmDetail/filmDetail?id=" + data.id
    })
  }
})