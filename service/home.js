import request from './network.js'
// 请求轮播图
export function getSwiperData(){
  return request({
    url:"/home/swiperdata"
  })
}
export function getNavbarData(){
  return request({
    url:"/home/catitems"
  })
}