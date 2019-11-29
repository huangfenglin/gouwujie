import {getCategories} from '../../service/category.js'
Page({

  data: {
    height:0,
    category:[],
    commodity:[],
    currentIndex: 0,
    scrollTop:0
  },
  categories: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 获取本地数据
    const cates = wx.getStorageSync('cates');
    console.log(cates)
    if(!cates) {
      console.log("没有数据 发送请求")
      this._getCategories();
    } else {
        console.log("有数据")
        // 判断数据是否过期
        if( Date.now() -cates.time > 10*1000) {
          // 数据过期
          console.log("数据过期了")
          this._getCategories()
        }else {
          console.log("没有过期");
          
          this.categories = cates.list;
         
          this.setData({
            category: this.categories.map(v => v.cat_name),
            commodity: this.categories[this.data.currentIndex].children
          })
        }
    }
  },

  onReady:function() {
    let systemInfo = wx.getSystemInfoSync()
    // px转换到rpx的比例
    let pxToRpxScale = 750 / systemInfo.windowWidth;
    let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale
    // 屏幕的高度
    let ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale
    this.setData({
      height: ktxWindowHeight
        })
  },
  _getCategories() {
    getCategories().then(res => {
      console.log(res)
      this.categories = res.data.message
      const category = this.categories.map(v => {
        return v.cat_name
      })

      const commodity = this.categories[this.data.currentIndex].children
      this.setData({
        category,
        commodity,

      })
      wx.setStorageSync("cates", { list: this.categories, time: Date.now() });
    })
  },
  // -------------------业务逻辑----------------------
  handleClick(event){
    this.setData({
      currentIndex: event.currentTarget.dataset.index,
      commodity: this.categories[event.currentTarget.dataset.index].children,
      scrollTop: 0
    })
  }
})