import {getGoodsList} from '../../service/goods_list.js'
Page({
  params:{
    query: "",  // 搜索关键字
    cid: "",    // 分类id
    pagenum: 1, // 页码
    pagesize: 2 //页容量
  },
  data: {
    goods:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid = options.cat_id

    this. _gettGoodsList(this.params)
  },
  _gettGoodsList(data) {
    getGoodsList(data).then(res=>{
      this.setData({
        goods: res.data.message.goods
      })
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }

})