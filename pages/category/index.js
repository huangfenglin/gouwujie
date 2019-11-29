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
    getCategories().then(res=>{
      console.log(res)
      this.categories = res.data.message
      const category = this.categories.map(v=>{
        return v.cat_name
      })

      const commodity = this.categories[this.data.currentIndex].children
      this.setData({
        category: category,
        commodity: commodity,
        
      })

    })
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
  // -------------------业务逻辑----------------------
  handleClick(event){
    this.setData({
      currentIndex: event.currentTarget.dataset.index,
      commodity: this.categories[event.currentTarget.dataset.index].children,
      scrollTop: 0
    })
  }
})