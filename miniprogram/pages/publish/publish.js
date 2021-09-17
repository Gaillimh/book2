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
    file: ''
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  resetClick: function () {
    this.setData({
      name: '',
      author: '',
      cover: '',
      detail: '',
      briefInput: '',
      catalogueInput: '',
      fileList: []
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
    const fileName = that.data.file.url.match(/\/([^\/]+)$/)[1]
    console.log(fileName);

    const fileInfo = this.data.fileList[0]
    wx.cloud.uploadFile({

      cloudPath: 'framework/' + fileName,
      filePath: that.data.file.url,

      success: res => {
        that.setData({
          cover: res.fileID
        })
        fileInfo.status = 'done'
        fileInfo.message = '上传成功'
        const db = wx.cloud.database();
        db.collection('category').add({
          data: {
            name: that.data.name,
            author: that.data.author,
            cover: that.data.cover,
            detail: that.data.detail,
            briefInput: that.data.briefInput,
            catalogueInput: that.data.catalogueInput,
            createTime: new Date(),
            updateTime: new Date()
          },
          success(res) {
            console.log(res);
            that.resetClick();
            Toast.success('上传成功');
          },
          fail(reason) {
            console.log(reason);
          }
        })
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
      fileList: this.data.fileList
    })
    this.setData({
      cover: ""
    })
  }
})