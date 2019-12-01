import {getGoodsList} from '../../service/goods_list.js'
Page({
  params:{
    query: "",  // 搜索关键字
    cid: "",    // 分类id
    pagenum: 1, // 页码
    pagesize: 10 //页容量
  },
  TotalPages: 1, // 总页数,用来判断下一页还有没有数据
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
      // 旧的数组
      const {goods} = this.data
      this.setData({
        // 当我们做分页了  总的数据 应该是不断 追加的！！！ 
        goods: [...goods,...res.data.message.goods]
      })
       // 计算总页数
       this.TotalPages = Math.ceil(res.data.message.total / this.params.pagesize);

      
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 1. 判断还有没有下一页数据
    if(this.params.pagenum >= this.TotalPages) {
      // 没有下一页数据
      console.log("没有数据了");
      
    } else {
      // 有下一页数据
      this.params.pagenum++
      this. _gettGoodsList(this.params)
    }

  }

})