import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting } from "../../utils/wxAsync";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户的收货地址
    address: {},
    carts: [],
    // 商品的总价格
    totalPrice:0
  },

  /**
   * 生命周期函数--页面启动完毕就加载 
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // adress = {对象} || 空字符串
    const address = wx.getStorageSync("address" || {});
    const carts = wx.getStorageSync("carts") || []
    this.setData({
      address,
      carts
    })
      this.countAll(carts)
  },
  // 获取通讯地址的一坨方法
  async handleFinalGet() {
    // 1 先获取用户授权状态
    const auth = (await getSetting()).authSetting["scope.address"];
    if(auth === false) {
      await openSetting()
    }
    const res = await chooseAddress(); 
     // 把数据存到缓存中
     wx.setStorageSync("address", res);
  },
  // 计算总价格 -  计算购买的数量
  countAll(carts) {
    let totalPrice = 0;
    let nums = 0;
    carts.forEach(v=>{
      if(v.isChecked){
        totalPrice += v.nums*v.goods_price
        // 我们要的是总的数量 而不是要购买的种类！！
        nums += v.nums
      }
      this.setData({
        totalPrice,
        nums
      })
    })

  },
    // 单个商品的选中事件
    checkboxChange(e) {
      // 根据索引拿到当前商品
      const {index} = e.currentTarget.dataset;
      let {carts} = this.data
       // 对选中状态 做取反
       carts[index].isChecked=!carts[index].isChecked;
       // 2 把数组 设置回 data中 和 缓存中
       this.setData({
         carts
       })
       wx.setStorageSync("carts", carts); 
       // 重新计算总价格   小程序中没有计算属性（页面中没有计算属性，组件中却是有计算属性！！！）
       this.countAll(carts);
    },
 // 数量的编辑 
 handleNumUpdate(e) {
    // unit = +1 || -1 
    const {unit,index} = e.currentTarget.dataset
      // 获取到了 data中的购物车数组
      let {carts} = this.data
      // 判断 数量是否超出界限 
    // 1 当数量大于等于库存 提示用户  unit也做判断 
    // 2 当数量等于1 unit也做判断 
    if(unit === 1 && carts[index].nums>=carts[index].goods_number){
      wx.showToast({
        title:"库存不足",
        icon:"none",
        mask:true
      });
      return
    } else if(carts[index].nums === 1 && unit === -1) {
      // 提示用户是否要删除商品
      wx.showModal({
        title:"警告",
        content: '您是否要删除该商品？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success:(result)=>{
          if(result.confirm) {
            // 从carts中删除该元素
            carts.splice(index, 1);
            this.setData({
              carts
            })
            wx.setStorageSync("carts", carts);
            this.countAll(carts);
          } else {
            console.log("取消");
            
          }
        }

      })
    }else {
      carts[index].nums += unit;
      this.setData({
        carts
      })
      wx.setStorageSync("carts", carts);

      this.countAll(carts);
    }
 }
})