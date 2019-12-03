import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting } from "../../utils/wxAsync";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户的收货地址
    address: {}
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
    this.setData({
      address
    })
      
  },
  async handleFinalGet() {
    // 1 先获取用户授权状态
    const auth = (await getSetting()).authSetting["scope.address"];
    if(auth === false) {
      await openSetting()
    }
    const res = await chooseAddress(); 
     // 把数据存到缓存中
     wx.setStorageSync("address", res);
  }
})