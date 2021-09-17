// pages/search/search.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
let timer
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    value: '',
    isSearch: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  isSearch() {
    if (this.data.list.length > 0) {
      this.setData({
        isSearch: false
      })
    } else {
      this.setData({
        isSearch: true
      })
    }
  },
  onShow: function () {
    this.isSearch()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSearch(ev) {
    clearTimeout(timer)
    const that = this
    console.log(ev.detail);
    this.setData({
      list: app.category[ev.detail],
      value: ev.detail
    })
    const regex = new RegExp('^[\\s\\S]*' + ev.detail + '[\\s\\S]*$')
    db.collection('category').orderBy('updateTime', 'desc').where(_.or([{
      name: regex
    }, {
      author: regex
    }])).get({
      success(res) {
        that.setData({
          list: res.data
        })
        console.log(res);
      },
      fail(reason) {
        console.error(reason);
      },
      complete() {
        that.isSearch()
      }
    })
  },
  searchChange(ev) {
    const that = this
    if (ev.detail.trim() === '') return
    clearTimeout(timer);
    timer = setTimeout(() => {
      that.onSearch(ev);
    }, 200)
  },
  onClick() {
    console.log(1);
  }
})