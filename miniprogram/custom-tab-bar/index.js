// custom-tab-bar/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    active:3,
    list: [{
        url: '/pages/lead/lead',
        icon: '/images/tab_icon1.png',
        iconActive: '/images/tab_icon1_active.png',
        text: '领读'
      },
      {
        url: '/pages/classify/classify',
        icon: '/images/tab_icon2.png',
        iconActive: '/images/tab_icon2_active.png',
        text: '分类'
      },
      {
        url: '/pages/desk/desk',
        icon: '/images/tab_icon3.png',
        iconActive: '/images/tab_icon3_active.png',
        text: '书桌'
      },
      {
        url: '/pages/personal/personal',
        icon: '/images/tab_icon4.png',
        iconActive: '/images/tab_icon4_active.png',
        text: '个人中心'
      },
    ]
  },

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
