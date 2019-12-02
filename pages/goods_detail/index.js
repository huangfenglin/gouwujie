import {getDetail} from '../../service/goods_detail.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getDetail(options).then(res=>{
      this.setData({
        goodsInfo:res.data.message
      })
    })
  },
  // 点击轮播图放大预览
  handlePreviewImg(e) {
    // 当前被点击的大图片路径
    const current = e.currentTarget.dataset.src
    // 要预览的整个图片的列表
    const urls = this.data.goodsInfo.pics.map(v=>v.pics_big)
    // 开始预览,微信提供的API
    wx.previewImage({
      current,
      urls
    });
      
  }


})