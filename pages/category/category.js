var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
Page({
	data: {
    navbar: [],
    currentTab: 0,
		films: [],
		hasMore: true,
		showLoading: true,
    pageNum: 0
	},
  onLoad: function () {
		var that = this
    // 获取分类
    if (that.data.navbar.length===0){
      douban.fetchCategory.call(that, config.apiList.category, function (res) {
        douban.fetchFilms.call(that, config.apiList.index, that.data.currentTab, that.data.pageNum)
      })
    }else{
      douban.fetchFilms.call(that, config.apiList.index, that.data.currentTab, that.data.pageNum)
    }
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
      pageNum: 0
		})
    douban.fetchFilms.call(that, config.apiList.index, that.data.currentTab, that.data.pageNum)
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
      douban.fetchFilms.call(that, config.apiList.index, that.data.currentTab, that.data.pageNum)
		}
	},
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})
	},
  navbarTap: function (e) {
    var that = this
    var categoryId = e.currentTarget.dataset.idx
    that.setData({
      films: [],
      currentTab: categoryId,
      pageNum: 0
    })
    wx.request({
      url: config.apiList.index,
      data: {
        categoryId: categoryId,
        pageNum: that.data.pageNum,
        pageSize: config.count
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res, 'fetchFilms')
        if (res.data.last === true) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.setData({
            hasMore: true
          })
        }
        that.setData({
          films: that.data.films.concat(res.data.content),
          pageNum: res.data.number + 1,
          showLoading: false
        })
        wx.stopPullDownRefresh()
      }
    })
  }  
})