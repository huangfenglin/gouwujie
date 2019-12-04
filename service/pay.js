import request from './network.js'
// 获取用户token
export function getToken(loginParams) {
  return request({
    url:"/users/wxlogin",
    method:"post",
    data: loginParams
  })
}
// 获取订单编号
export function getOlderNumber(orderParams,token) {
  return request ({
    url:"/my/orders/create",
    method:"post",
    data: orderParams,
    header: { Authorization: token}
  })
}