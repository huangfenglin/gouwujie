import {
  baseURL
} from './config.js'

//  定义一个变量 记录同时发送请求的个数
let ajaxCount = 0;
export default function request(options) {
  ajaxCount++;
  return new Promise((resolve,reject)=>{
    // 显示加载中 
    wx.showLoading({
      title: "加载中",
      mask: true
    });
      wx.request({
        url: baseURL+options.url,
        method: options.method || "get",
        data: options.data,
        success: resolve,
        fail: reject,
        complete() {
          ajaxCount--;
          if (ajaxCount === 0) {
            // 此时数据都回来了
            wx.hideLoading();
          }
        }
      })
  })
}