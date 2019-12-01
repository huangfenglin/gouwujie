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
    console.log(options);
    
    getDetail(options).then(res=>{
      this.setData({
        goodsInfo:res.data.message
      })
    })
  }


})