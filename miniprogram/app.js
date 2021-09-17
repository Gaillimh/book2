//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}
    // this.category = {
    //   神话: ['/../images/img/book2.jpg'],
    //   文化生活: ['/../images/img/book5.jpg', '/../images/img/book6.jpg'],
    //   人物自传: ['/../images/img/book7.jpg', '/../images/img/book8.jpg'],
    //   上海译文: ['/../images/img/book9.jpg'],
    //   理想国: ['/../images/img/book10.jpg'],
    //   新经典: ['/../images/img/book11.jpg'],
    //   小说: ['/../images/img/book12.jpg'],
    //   互联网: ['/../images/img/book13.jpg'],
    //   心理: ['/../images/img/book14.jpg']
    // }
    this.category = [{
      "name": "神话",
      "cover": "/../images/img/book6.jpg",
      "desc": "目标越接近，困难越增加。但愿每一个人都像星星一样安详而从容地不断沿着既定的目标走完自己的路程。",
      "author": "歌德",
      "authorIcon": "歌德"
    }, {
      "name": "文化生活",
      "cover": "/../images/img/book7.jpg",
      "desc": "宽恕给予我们再度去爱的机会。又帮助我们敞开心怀，既能给予爱，又能接受爱。",
      "author": "美·约翰·格雷",
      "authorIcon": "美·约翰·格雷"
    }, {
      "name": "人物自传",
      "cover": "/../images/img/book8.jpg",
      "desc": "奋斗能使我们解脱自身的束缚，并使我们成为最优秀最伟大的人物的同伴。",
      "author": "爱因斯坦",
      "authorIcon": "爱因斯坦"
    }, {
      "name": "上海译文",
      "cover": "/../images/img/book9.jpg",
      "desc": "人的智慧掌握着三把钥匙，一把开启数字，一把开启字母，一把开启音符。知识、思想、幻想就在其中。",
      "author": "雨果",
      "authorIcon": "雨果"
    }, {
      "name": "理想国",
      "cover": "/../images/img/book10.jpg",
      "desc": "我们不得不饮食睡眠游玩恋爱，也就是说，我们不得不接触生活中最甜蜜的事情，不过我们必须不屈服于这些事物。",
      "author": "居里夫人",
      "authorIcon": "居里夫人"
    }, {
      "name": "新经典",
      "cover": "/../images/img/book11.jpg",
      "desc": "我已经给自我选定了道路，我将坚定不移。既然我已经踏上这条道路，那么，任何东西都不应妨碍我沿着这条路走下去。",
      "author": "康德",
      "authorIcon": "康德"
    }, {
      "name": "小说",
      "cover": "/../images/img/book12.jpg",
      "desc": "一个勤奋的人虽然会因为他的勤奋而损害到他的见地或者精神上的清新与创意，但是他依然会受到褒奖。",
      "author": "尼采",
      "authorIcon": "尼采"
    }, {
      "name": "互联网",
      "cover": "/../images/img/book13.jpg",
      "desc": "每一天创新一点点，是在走向领先。每一天多做一点点，是在走向丰收。每一天进步一点点，是在走向成功。",
      "author": "邹金宏",
      "authorIcon": "邹金宏"
    }, {
      "name": "心理",
      "cover": "/../images/img/book14.jpg",
      "desc": "理想的社会状态不是财富均分，而是每个人按其贡献的大小，从社会的总财富中提取它应得的报酬。",
      "author": "亨·乔治",
      "authorIcon": "亨·乔治"
    }, {
      "name": "读客",
      "cover": "/../images/img/photo1.jpg",
      "desc": "有些人活着没有任何目标，他们在世间行走就像河中的一颗小草。他们不是行走，而是随波逐流。",
      "author": "小塞涅卡",
      "authorIcon": "小塞涅卡"
    }, {
      "name": "文艺",
      "cover": "/../images/img/photo2.jpg",
      "desc": "志气太大，理想过多，事实迎不上头来，结果自然是失望烦闷；志气太小，因循苟且，麻木消沉，结果就必至于堕落。",
      "author": "朱光潜",
      "authorIcon": "朱光潜"
    }, {
      "name": "经济管理",
      "cover": "/../images/img/photo3.jpg",
      "desc": "感情有着极大的鼓舞力量，因此，它是一切道德行为的重要前提，谁要是没有强烈的志向，也就不能够热烈地把这个志向体现于事业中。",
      "author": "凯洛夫",
      "authorIcon": "凯洛夫"
    }]
    this.selection=[]
  }
})