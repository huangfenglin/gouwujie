// pages/home/index.js
import {getSwiperData} from '../../service/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    getSwiperData().then(res=>{
      console.log(res)
      this.setData({
        swiper: res.data.message
      })
    })
  },

})