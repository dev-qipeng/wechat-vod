var config = require('./config.js')
var message = require('../../component/message/message')
var app = getApp()

function login(url, data, cb){
  var that = this
  message.hide.call(that)
  wx.request({
    method: 'POST',
    url: url,
    data: data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    success: function (res) {
      console.log(res);
      if (res.data.result === 1) {

        wx.setStorageSync("userId", res.data.data.id);
        app.globalData.userId = res.data.data.id;
        console.log(app.globalData.userId)
        console.log('设置userId成功');
        
        var cookie = res.header['Set-Cookie'];
        if(cookie == 'undefined'){
          cookie = res.header['set-cookie'];
        }
        var token = cookie.split(";")[0];
        wx.setStorageSync("userId", res.data.data.id);
        app.globalData.userId = res.data.data.id;
        console.log(app.globalData.userId)
        console.log('设置userId成功');
        wx.setStorageSync("token", token);
        wx.switchTab({
          url: '../index/index',
        })
      }
      typeof cb == 'function' && cb(res.data)
    },
  })
}

// 获取电影列表
function fetchFilms(url,categoryId, pageNum, cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        categoryId: categoryId,
        pageNum: pageNum,
        pageSize: config.count
      },
      method: 'GET', 
      header: {
        "Content-Type": "application/json",
        "Cookie": config.token
      },
      success: function(res){
        console.log(res,'fetchFilms')
        if(res.data.last === true){
          that.setData({
            hasMore: false,
          })
        }
        that.setData({
          films: that.data.films.concat(res.data.content),
          pageNum: res.data.number + 1,
          showLoading: false
        })
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
  }
}

// 获取电影详情
function fetchFilmDetail(url, id, cb) {
  var that = this;
  message.hide.call(that)
  wx.request({
    url: url + id,
    method: 'GET',
    data: {
      userId: wx.getStorageSync('userId')
    },
    header: {
      "Content-Type": "application/json",
      "Cookie": config.token
    },
    success: function(res){
      if(res.data.like == true){
        that.setData({
          like: true
        })
      }
      that.setData({
        filmDetail: res.data,
        showLoading: false,
        showContent: true
      })
      wx.setNavigationBarTitle({
          title: res.data.name
      })
      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function() {
      that.setData({
          showLoading: false
      })
      message.show.call(that,{
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  })
}

// 获取人物详情
function fetchPersonDetail(url, id, cb) {
  var that = this;
  message.hide.call(that)
  wx.request({
    url: url + id,
    method: 'GET', 
    header: {
      "Content-Type": "application/json",
      "Cookie": config.token
    },
    success: function(res){
      that.setData({
        personDetail: res.data,
        showLoading: false,
        showContent: true
      })
      wx.setNavigationBarTitle({
          title: res.data.name
      })
      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function() {
      that.setData({
          showLoading: false
      })
      message.show.call(that,{
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  })
}

// 搜索（关键词或者类型）
function search(url, keyword, pageNum, cb){
  var that = this
  message.hide.call(that)
  var url = decodeURIComponent(url)
  if (that.data.hasMore) {
    wx.request({
      url: url + keyword,
      data: {
        pageNum: pageNum,
        pageSize: config.count
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json",
        "Cookie": config.token
      },
      success: function(res){
        console.log(res);
        if(res.data.last === true){
          that.setData({
            hasMore: false
          })
        }
        that.setData({
          films: that.data.films.concat(res.data.content),
          pageNum: that.data.pageNum + 1,
          showLoading: false
        })
        wx.setNavigationBarTitle({
            title: keyword
        })
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
      }
    })
  }
}

// 获取首页Banner
function fetchBanners(url, cb){
  var that = this
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/json",
      "Cookie": config.token
    },
    success: function(res){
      that.setData({
        bannerList: res.data
      })
      typeof cb == 'function' && cb(res)
    },
    fail: function () {
      that.setData({
        showLoading: false
      })
      message.show.call(that, {
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  })
}

// 获取分类
function fetchCategory(url,cb) {
  var that = this
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/json",
      "Cookie": config.token
    },
    success: function (res) {
      console.log('fetchCategory...', res.data[0].id)
      that.setData({
        navbar: res.data,
        currentTab: res.data[0].id
      })
      console.log(res,'分类');
      typeof cb == 'function' && cb(res)
    },
    fail: function () {
      that.setData({
        showLoading: false
      })
      message.show.call(that, {
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  })
}

// 获取评论列表
function fetchCommentList(url,id, cb) {
  var that = this
  wx.request({
    url: url+'/'+id,
    method: 'GET',
    header: {
      "Content-Type": "application/json",
      "Cookie": config.token
    },
    success: function (res) {
      console.log('评论列表...', res)
      that.setData({
        commentList: res.data
      })
      typeof cb == 'function' && cb(res)
    },
    fail: function () {
      
    }
  })
}
  // 添加评论
  function addComment(url, param, cb) {
    var that = this
    wx.request({
      url: url,
      method: 'POST',
      data: param,
      header: {
        "Content-Type": "application/json",
        "Cookie": config.token
      },
      success: function (res) {
        // console.log('插入评论状态', res)

        typeof cb == 'function' && cb(res)
      },
      fail: function () {

      }
    })
  }
  // 添加收藏
  function addCollection(url, param, cb) {
    var that = this
    wx.request({
      url: url,
      method: 'POST',
      data: param,
      header: {
        "Content-Type": "application/json",
        "Cookie": config.token
      },
      success: function (res) {
        console.log('插入收藏状态', res)
        that.setData({
          like: true
        })
        typeof cb == 'function' && cb(res)
      },
      fail: function () {

      }
    })
  }

  // 取消收藏
  function disCollection(url, param, cb) {
    var that = this
    wx.request({
      url: url,
      method: 'POST',
      data: param,
      header: {
        "Content-Type": "application/json",
        "Cookie": config.token
      },
      success: function (res) {
        console.log('取消收藏状态', res)
        that.setData({
          like: false
        })
        typeof cb == 'function' && cb(res)
      },
      fail: function () {

      }
    })
  }
  // 收藏列表
  function fetchCollectionList(url, id, cb) {
    var that = this
    wx.request({
      url: url+'/'+id,
      method: 'GET',
      header: {
        "Content-Type": "application/json",
        "Cookie": config.token
      },
      success: function (res) {
        console.log('收藏列表', res)
        if(res.data.length > 0){
          that.setData({
            isNull: false,
            films: res.data
          })
        }
       
        typeof cb == 'function' && cb(res)
      },
      fail: function () {

      }
    })
  }

  // 添加浏览历史
  function addHistory(url, id) {
    var that = this
    wx.request({
      url: url,
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userId'),
        videoId: id
      },
      header: {
        "Content-Type": "application/json",
        "Cookie": config.token
      },
      success: function (res) {
        console.log('添加历史', res)

      },
      fail: function () {

      }
    })
  }

  // 浏览历史列表
  function fetchHistoryList(url, id, cb) {
    var that = this
    wx.request({
      url: url + '/' + id,
      method: 'GET',
      header: {
        "Content-Type": "application/json",
        "Cookie": config.token
      },
      success: function (res) {
        console.log('浏览历史列表', res)
        if (res.data.length > 0) {
          that.setData({
            isNull: false,
            films: res.data
          })
        }

        typeof cb == 'function' && cb(res)
      },
      fail: function () {

      }
    })
  }
module.exports = {
  login: login,
  fetchFilms: fetchFilms,
  fetchFilmDetail: fetchFilmDetail,
  fetchPersonDetail: fetchPersonDetail,
  search: search,
  fetchBanners: fetchBanners,
  fetchCategory: fetchCategory,
  fetchCommentList: fetchCommentList,
  addComment: addComment,
  addCollection: addCollection,
  disCollection: disCollection,
  addHistory: addHistory,
  fetchCollectionList: fetchCollectionList,
  fetchHistoryList: fetchHistoryList
}