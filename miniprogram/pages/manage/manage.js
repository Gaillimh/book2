// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    amount: 6,
    dataAmount: 0,
    flag: false,
    triggered: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  query(callback) {
    const that = this
    const db = wx.cloud.database();
    const _ = wx.command;
    db.collection('category').orderBy('updatetime', 'desc').limit(that.data.amount).get({
      success(res) {
        that.setData({
          list: res.data
        })
      }
    })
    db.collection('category').get({
      success(res) {
        that.setData({
          dataAmount: res.data.length
        })

      },
      fail(reason) {
        console.error(reason);
      },
      complete: () => {
        console.log(callback);
        if (typeof callback === 'function'){
          callback()
        }
      }
    })
  },
  onLoad: function (options) {
    this.query()
  },
  refresh(callback) {
    this.setData({
      list: [],
      flag: false
    })
    this.query(callback)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refresh()
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
    console.log(this.data.dataAmount, this.data.amount);
    const that = this
    if (this.data.dataAmount > this.data.amount) {
      let i = this.data.amount + 1
      this.setData({
        amount: i
      })
    } else {
      this.setData({
        flag: true
      })
    }
    this.onLoad()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  closeClick(ev) {
    console.log(ev);
  },
  onPulling(ev) {
    if (this.data.triggered) return
    if (ev.detail.dy >= 80) {
      this.setData({
        amount: 6,
        triggered: true,
        flag: false,
      })
      console.log('pulling')
      this.refresh(() => {
        this.setData({
          triggered: false
        })
      })
    }
  }
})