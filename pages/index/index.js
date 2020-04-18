var api = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
    baseUrl: config.baseUrl,
		films: [],
		hasMore: true,
		showLoading: true,
    pageNum: 0,
		bannerList: config.bannerList
	},
	onLoad: function() {
		var that = this
    api.fetchBanners.call(that,config.apiList.banner,function(data){
      console.log(data,'banner-list')
    })
    api.fetchFilms.call(that, config.apiList.index,'', that.data.pageNum)
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
      pageNum: 0
		})
		this.onLoad()
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
      api.fetchFilms.call(that, config.apiList.index,'', that.data.pageNum)
		}
	},
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})
	},	
	viewFilmByTag: function(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.navigateTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
		})
	},
	viewBannerDetail: function(e) {
		var data = e.currentTarget.dataset
		if (data.type == 'film') {
			wx.navigateTo({
				url: "../filmDetail/filmDetail?id=" + data.id
			})
		} else if (data.type == 'person') {
			wx.navigateTo({
				url: '../personDetail/personDetail?id=' + data.id
			})
		} else if (data.type == 'search') {
			// stype(searchType) 0:关键词, 1:类型标签
			var searchUrl = stype == 'keyword' ? config.search.byKeyword : config.search.byTag
			wx.navigateTo({
				url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
			})
		}
	},
	viewSearch: function() {
		wx.navigateTo({
			url: '../search/search'
		})
	}
})