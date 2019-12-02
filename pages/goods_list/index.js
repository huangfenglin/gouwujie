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
    titles:['综合','销量','价格'],
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid = options.cat_id

    this._gettGoodsList(this.params)
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
    this.params.pagenum = 1;
    this.setData({
      goods: []
    })
    this._gettGoodsList(this.params)
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
      this._gettGoodsList(this.params)
    }

  },
  // ---------------------业务逻辑-------------------------
  titleChange(e){
    this.setData({
      currentIndex: e.detail.index
    })
    
  }

})
// 2 定义接口的参数 
//   ! 为了方便修改 把参数变成全局变量 
// 3 发送请求 获取 商品列表数据
// 4 上拉加载下一页
//   1 触发上拉事件 -  滚动条 触底事件 ？？？   onReachBottom
//   2 判断有没有下一页的数据
//     0 如何判断 
//       1 前端分页  发送请求的时候 后台一次性返回所有数据 
//   !   2  后端分页  前端只要把 页码 等参数发送到后台，后台 根据前端的参数 来返回数据
//       3 获取当前的页码  和 总的页码比较即可  
//         总条数 = 21  页容量 = 10
//         总页数 = Math.ceil(总条数 / 页容量 )
//     1 没有 提示用户
// !  2 有数据 
//    1  当前页码 ++ 
//    2 再调用 获取接口数据的函数 

// 5 下拉刷新数据
//   0 先触发下拉刷新事件  onPullDownRefresh
//   1 当用户触发下拉刷新的时候 体验  ===  用户第一次打开 商品列表页面 
//   2 思考
//     1 先打开页面
//     2 不断的加载下一页数据 加载第10页数据
//       1 pagenum =10 
//       2 页面的商品数据 很多  goods
//     3 开始触发下拉刷新了 
//       1 其实也是触发了一个事件
//         1 数据重置 ！！ 
//         2 goods =  第一页的10条数据即可
//         3 pagenum=1
//           goods=[]
//           this.getList()