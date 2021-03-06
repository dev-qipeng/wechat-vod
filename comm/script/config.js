/*
备注
city: 城市（在程序载入时获取一次）
count: 返回结果数量
baiduAK: 百度地图AK
apiList: api列表
hotKeyword: 搜索页热门关键词关键词
hotTag: 搜索页热门类型
bannerList: 首页（热映页）轮播图列表列表
skinList: “我的”页面背景列表
shakeSound: 摇一摇音效地址（带url表示远程地址）
shakeWelcomeImg: 摇一摇欢迎图片
api地址：api.douban.com
代理地址：douban.uieee.com
https://www.qipeng.site/api/
http://127.0.0.1:8081/api/
*/
// var url = 'https://www.qipeng.site/api/'
var url = 'http://127.0.0.1:8081/api/'
module.exports = {
  baseUrl: url,
  token: wx.getStorageSync('token'),
  city: '',
  count: 4,
  baiduAK: 'Y1R5guY8Y2GNRdDpLz7SUeM3QgADAXec',
  apiList: {
    login: url + 'user/login',
    index: url+'video/list',
    banner: url +'video/banner-list',
    category: url+'category/list',
    detail: url +'video/detail/',
    commentList: url +'comment/list',
    addComment: url + 'comment/insert',
    addCollection: url + 'collection/insert',
    disCollection: url + 'collection/delete',
    collectionList: url + 'collection/list',
    addHistory: url + 'history/insert',
    historyList: url + 'history/list',
    top: 'https://douban.uieee.com/v2/movie/top250',
    search: {
      byKeyword: url +'/video/search?keyword=', 
      byTag: url +'movie/search?tag='
    },
    filmDetail: url +'video/detail/',
    personDetail: 'https://douban.uieee.com/v2/movie/celebrity/',
    baiduMap: 'https://api.map.baidu.com/geocoder/v2/'
  },
  hotKeyword: ['功夫熊猫', '烈日灼心', '摆渡人', '长城', '我不是潘金莲', '这个杀手不太冷', '驴得水', '海贼王之黄金城', '西游伏妖片', '我在故宫修文物', '你的名字'],
  hotTag: ['动作', '喜剧', '爱情', '悬疑'],
  bannerList: [
      {type:'film', id: '26683290', imgUrl: url + '/images/banner_1.jpg'},
      {type:'film', id: '25793398', imgUrl: url + '/images/banner_2.jpg'},
      {type:'film', id: '26630781', imgUrl: url + '/images/banner_3.jpg'},
      {type:'film', id: '26415200', imgUrl: url + '/images/banner_4.jpg'},
      {type:'film', id: '3025375', imgUrl: url + '/images/banner_5.jpg'}
  ],
  skinList: [
      {title: '公路', imgUrl: url + '/images/user_bg_1.jpg'},
      {title: '黑夜森林', imgUrl: url + '/images/user_bg_2.jpg'},
      {title: '鱼与水', imgUrl: url + '/images/user_bg_3.jpg'},
      {title: '山之剪影', imgUrl: url + '/images/user_bg_4.jpg'},
      {title: '火山', imgUrl: url + '/images/user_bg_5.jpg'},
      {title: '科技', imgUrl: url + '/images/user_bg_6.jpg'},
      {title: '沙漠', imgUrl: url + '/images/user_bg_7.jpg'},
      {title: '叶子', imgUrl: url + '/images/user_bg_8.jpg'},
      {title: '早餐', imgUrl: url + '/images/user_bg_9.jpg'},
      {title: '英伦骑车', imgUrl: url + '/images/user_bg_10.jpg'},
      {title: '草原', imgUrl: url + '/images/user_bg_11.jpg'},
      {title: '城市', imgUrl: url + '/images/user_bg_12.jpg'}
  ],
  shakeSound: {
      startUrl: url + '/sound/shake.mp3',
      start: '',
      completeUrl: url + '/sound/shakeComplete.wav',
      complete: ''
  },
  shakeWelcomeImg: url + '/images/shake_welcome.png'
}