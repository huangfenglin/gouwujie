import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting, login, requestPayment} from "../../utils/wxAsync";
import {getToken,getOlderNumber,toPay,getOrder} from "../../service/pay.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 用户的收货地址
      address: {},
      // 购物车数组
      carts: [],
      // 商品的总价格
      totalPrice: 0,
      // 结算的数量
      nums: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const carts = wx.getStorageSync("carts") || [];
    const address = wx.getStorageSync("address") || {};
    this.setData({
      address, carts
    })
    this.countAll(carts);
  },
  // 计算总价格 -  计算购买的数量
  countAll(carts) {
    let totalPrice = 0;
    let nums = 0;
    carts.forEach(v => {
      if (v.isChecked) {
        totalPrice += v.nums * v.goods_price

        nums += v.nums
      }
    })
    this.setData({
      totalPrice,
      nums
    })
  },
  // 点击支付
   async handleGetUserInfo(e) {
     // 1 获取用户信息中  rawData。。。
     const { encryptedData, rawData, iv, signature } = e.detail;
      // 2 执行微信小程序的内置的登录 获取 code 
      const {code} = (await login());
      const loginParams = {
        encryptedData, rawData, iv, signature, code
      }
      // 3.获取用户token
      // 可能因为后台的接口问题 我们自己再做测试的时候 要多点几次为准
      const res = await getToken(loginParams)
      const token = res.data.message.token
      
        // 4 获取订单编号要 参数
        let orderParams ={
          // 订单的总价格
          order_price: this.data.totalPrice,
          // 收货地址(暂时只写省份)
          consignee_addr: this.data.address.provinceName,
           // 商品数组 具体的说明看接口文档
           goods: this.data.carts.map(v => (
            {
              goods_id: v.goods_id,
              // 购买的数量
              goods_number: v.nums,
              goods_price: v.goods_price
            }))
        }
         // 5 创建订单 获取订单编号
         
         const result = await getOlderNumber(orderParams,token)
         const order_number = result.data.message
         
        // 6 获取支付参数
        const result1 = await toPay(order_number,token)
    
        
        const pay = result1.data.message.pay;
        // 7 调起微信支付   手机会出现支付的画面 
        const res1 = await requestPayment(pay);
        // 8 还需要查看一下 我们自己的后台的订单状态
        const order = await getOrder(order_number,token)

          // 9.1 获取缓存中的完整的购物车数据
      let carts = wx.getStorageSync("carts");
      // 留下未选中的商品即可
      carts = carts.filter(v => !v.isChecked);
      wx.setStorageSync("carts", carts);
      // 9.2 弹出窗口 提示用户 
      wx.showToast({
        title: '支付成功',
        duration: 1500,
        mask: true,
        success: (result) => {
          // 9.3  跳转到 订单页面即可
          wx.navigateTo({
            url: '/pages/order/index'
          });
        }
      });
   }

})