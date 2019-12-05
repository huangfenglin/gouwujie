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
// 支付
export function toPay(order_number,token) {
  return request({
    url:"/my/orders/req_unifiedorder",
    method:"post",
    data:order_number,
    header:{ Authorization: token}
  })
}
// 查看订单状态
export function getOrder(order_number,token) {
  return request ({
    url:"/my/orders/chkOrder",
    method:"post",
    data: order_number,
    header: { Authorization: token}
  })
}