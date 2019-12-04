
// 获取微信授权信息
export const getSetting = () =>{
  return new Promise ((resolve,reject)=>{
    wx.getSetting({
      success: resolve,
    });
  })
}

//  获取收货地址
export const chooseAddress = () =>{
    return new Promise((resolve,reject)=>{
      wx.chooseAddress({
        success: resolve
      });
        
    })
}

// 打开授权设置页面
export const openSetting = ()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: resolve
    });
      
  })
}
// 执行用户登录
export const login = ()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 10000,
      success:resolve
    })
  })
}