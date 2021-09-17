// pages/classify/classify.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    scrollHeight:0,
    app: app.category,
    titleCover: [{
        text: '在读榜',
        url: '/../images/img/book12.jpg'
      },
      {
        text: '新书榜',
        url: '/../images/img/book13.jpg'
      }
    ],
    category: []
  },
  onReady: function () {
    let query = wx.createSelectorQuery()
    let nodeRef = query.select('.list')
    nodeRef.fields({
      size: true, 
    }, (res) => {
      console.log(res)
      this.setData({
        scrollHeight: res.height
      })
    })
    query.exec()
  },
  onLoad: function (options) {

    let botton = wx.getSystemInfoSync().safeArea['bottom'];
    let screenHeight = wx.getSystemInfoSync().screenHeight;
    this.setData({
      height: (140 + screenHeight - botton) + 'rpx'
    })
    let i = 0;
    for (const key in app.category) {
      let t = 'category[' + i++ + ']';
      this.setData({
        [t]: key
      })
    }
  },
  onShow: function () {
    this.getTabBar().init();
  },
  onSearch(ev) {
    console.log(ev);
  },
  onclick(ev) {
    app.name = ev.currentTarget.dataset.index
  },
  searchClick() {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})