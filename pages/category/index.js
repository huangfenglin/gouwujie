import {getCategories} from '../../service/category.js'
Page({

  data: {
    height:0,
    categories: [],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    getCategories().then(res=>{
      console.log(res);
      this.setData({
        categories: res.data.message
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
    console.log(event);
    this.setData({
      currentIndex: event.currentTarget.dataset.index
    })
  }
})