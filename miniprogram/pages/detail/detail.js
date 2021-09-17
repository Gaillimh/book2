// pages/detail/detail.js
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    buttonactive: 1,
    url: '',
    catalog: '',
    details: '',
    selection: app.selection,
    _id: '',
    flag: false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    const that = this;
    if (this.data.selection.indexOf(this.data._id) > 0) {
      this.setData({
        flag: true
      })
    }
    db.collection('category').where({
      _id: options._id
    }).get({
      success(res) {
        that.setData({
          _id: options._id,
          details: res.data[0].briefInput,
          url: res.data[0].cover,
          catalog: res.data[0].catalogueInput.split("\n")
        })
        console.log(res);
        db.collection('desk').where({
          _id: that.data._id
        }).get({
          success(res) {
            console.log(res);
            if (res.data.length > 0) {
              that.setData({
                flag: true
              })
            }
          },
          fail(reason) {
            console.error(reason);
          },complete(){
            Toast.loading({
              message: '加载中...',
              forbidClick: false,
            });
          }
        })
      },
      fail(reason) {
        console.log(reason);
      }
    })

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
  desk() {

  },
  butonChange(event) {
    const that = this
    this.setData({
      buttonactive: event.detail
    })
    if (this.data.buttonactive == 0) {
      if (that.data.flag) {
        db.collection('desk').where({
          _id: that.data._id
        }).remove({
          success(res) {
            console.log(res);
            that.setData({
              flag: false
            })
          },
          fail(reason) {
            console.log(reason);
          }
        })
      } else {
        db.collection('desk').where({
          _id: that.data._id
        }).get({
          success(res) {
            if (res.data.length <= 0) {
              db.collection('desk').add({
                data: {
                  _id: that.data._id
                }
              })
              that.setData({
                flag: true
              })
            }
          },
          fail(reason) {
            console.error(reason);
          }
        })
      }
    }
  },
})