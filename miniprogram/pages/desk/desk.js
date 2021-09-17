// pages/desk/desk.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    list: [],
    isSelect: false,
    selection: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let botton = wx.getSystemInfoSync().safeArea['bottom'];
    let screenHeight = wx.getSystemInfoSync().screenHeight;
    this.setData({
      height: (120 + screenHeight - botton) + 'rpx'
    })
  },
  clear() {
    this.data.list.forEach(el => {
      el.checked = false
    })
    this.setData({
      list: this.data.list,
      selection: [],
    })
  },
  onSelectBtn() {
    this.setData({
      isSelect: !this.data.isSelect
    })
    this.clear()
  },
  refresh() {
    this.setData({
      list: [],
      selection: []
    })
    console.log(this.data.list);
    this.getTabBar().init();
    const that = this
    db.collection('desk').get({
      success(res) {
        res.data.forEach(element => {
          db.collection('category').where({
            _id: element._id
          }).get({
            success(res) {
              res.data[0].checked = false
              that.data.list.push(res.data[0])
              console.log(res.data[0]);
            },
            fail(reason) {
              console.error(reason);
            },
            complete() {
              that.setData({
                list: that.data.list
              })
            }
          })
        });
      }
    })
  },
  onShow: function () {
    this.refresh()
  },
  onCellClick(ev) {
    let book = this.data.list[ev.currentTarget.dataset.i]
    if (this.data.isSelect) {
      book.checked = !book.checked
      if (book.checked) {
        this.data.selection.push(book._id)
      } else {
        this.data.selection = this.data.selection.filter(el => {
          return el !== book._id
        })
      }
      this.setData({
        list: this.data.list,
        selection: this.data.selection
      })
    } else {
      wx.navigateTo({
        url: '/pages/detail/detail?_id=' + book._id,
      })
    }
    console.log(this.data.selection);
  },
  onRemove() {
    const that = this
    const db = wx.cloud.database()
    this.data.selection.forEach(el => {
      db.collection('desk').where({
        _id: el
      }).remove({
        success(res) {
          that.setData({
            isSelect: false,
          })
          that.onShow()
          console.log(res);
        },
        fail(reason) {
          console.log(reason);
        }
      })
    })
  }
})