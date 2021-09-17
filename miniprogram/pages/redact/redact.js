// pages/publish/publish.js
import Toast from '@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    author: '',
    detail: '',
    briefInput: '',
    catalogueInput: '',
    show: false,
    columns: ['神话', '文化生活', '人物自传', '上海译文', '理想国', '新经典 ', '小说', '互联网', '心理'],
    fileList: [],
    cover: '',
    file: '',
    deletfile: '',
    flag: false,
    _id: ''
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  resetClick: function () {
    wx.navigateBack()
  },
  Db() {
    const that = this
    const db = wx.cloud.database();
    db.collection('category').where({
      _id: that.data._id
    }).update({
      data: {
        name: that.data.name,
        author: that.data.author,
        cover: that.data.cover,
        detail: that.data.detail,
        briefInput: that.data.briefInput,
        catalogueInput: that.data.catalogueInput,
        updateTime: new Date()
      },
      success(res) {
        console.log(that.data.cover);
        that.resetClick();
        Toast.success('上传成功');
      },
      fail(reason) {
        console.log(reason);
      }
    })
  },
  publishClick() {
    const that = this;
    this.data.fileList.pop()
    this.data.fileList.push({
      url: that.data.file.url,
      name: '图片',
      status: 'uploading',
      message: '上传中...'
    })
    this.setData({
      fileList: this.data.fileList
    })
    if (that.data.flag) {
      wx.cloud.deleteFile({
        fileList: [this.data.deletfile],
        success(res) {
          console.log(res, '删除文件')
        },
        fail(err) {
          console.log(err)
        }
      })
      const fileName = that.data.file.url.match(/\/([^\/]+)$/)[1]
      const fileInfo = this.data.fileList[0]
      wx.cloud.uploadFile({

        cloudPath: 'framework/' + fileName,
        filePath: that.data.file.url,

        success: res => {
          that.setData({
            cover: res.fileID
          })
          fileInfo.status = 'done'
          
          that.Db()
        },
        fail: res => {
          fileInfo.status = 'fail'
          fileInfo.message = '上传失败'
        },
        complete: () => {
          this.setData({
            fileList: this.data.fileList
          })
        }
      })
    } else {
      console.log(that.data.cover);
      that.Db()
    }


  },
  briefInput(ev) {
    this.setData({
      briefInput: ev.detail.value
    })
  },
  catalogueInput(ev) {
    this.setData({
      catalogueInput: ev.detail.value
    })
  },
  detailClick() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onConfirm(event) {
    this.setData({
      detail: event.detail.value
    })
    this.setData({
      show: false
    });
  },
  onCancel() {
    this.setData({
      show: false
    });
  },
  afterRead(ev) {
    const that = this
    this.setData({
      file: ev.detail.file
    })
    this.data.fileList.push({
      url: that.data.file.url,
      name: '图片',
    })
    this.setData({
      fileList: this.data.fileList
    })
  },

  onDelete(ev) {
    const index = ev.detail.index
    this.data.fileList.splice(index, 1)
    this.setData({
      fileList: this.data.fileList,
      flag: true
    })
    this.setData({
      cover: ""
    })
  },
  onLoad: function (options) {
    this.refresh(options)
  },
  refresh(ev) {
    const db = wx.cloud.database();
    const that = this
    db.collection('category').where({
      _id: ev._id
    }).get({
      success(res) {
        that.setData({
          name: res.data[0].name,
          author: res.data[0].author,
          cover: res.data[0].cover,
          detail: res.data[0].detail,
          briefInput: res.data[0].briefInput,
          catalogueInput: res.data[0].catalogueInput,
          file: res.data[0].cover,
          deletfile: res.data[0].cover,
          _id: res.data[0]._id
        })
        that.data.fileList.push({
          url: that.data.file,
          name: '图片',
        })
        that.setData({
          fileList: that.data.fileList
        })
      },
      fail(reason) {
        console.error(reason);
      }
    })

  }
})