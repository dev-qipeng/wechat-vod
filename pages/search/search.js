var message = require('../../component/message/message')
var api  = require('../../comm/script/fetch')
var config  = require('../../comm/script/config')
Page({
  data:{
    searchType: 'keyword',
    hotCate: []
  },
  onLoad(){
    var that = this
    api.fetchCategory.call(that, config.apiList.category, function(res){
      console.log(res)
      that.setData({
        hotCate: res.data
      })
    })
  },
  changeSearchType: function() {
    var types = ['默认', '类型'];
    var searchType = ['keyword', 'cate']
    var that = this
    wx.showActionSheet({
      itemList: types,
      success: function(res) {
        console.log(res)
        if (!res.cancel) {
          that.setData({
            searchType: searchType[res.tapIndex]
          })
        }
      }
    })
  },
  search: function(e) {
    var that = this
    var keyword = e.detail.value.keyword
    if (keyword == '') {
      message.show.call(that,{
        content: '请输入内容',
        icon: 'null',
        duration: 1500
      })
      return false
    } else {
      var searchUrl = that.data.searchType == 'keyword' ? config.apiList.search.byKeyword : config.apiList.search.byTag
      wx.redirectTo({
        url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
      })
    }
  },
  searchByCate: function(e) {
    var that = this
    var keyword = e.currentTarget.dataset.keyword
    wx.redirectTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
    })
  }
})