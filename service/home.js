import request from './network.js'
// 请求轮播图
export function getSwiperData(){
  return request({
    url:"/home/swiperdata"
  })
}
// 导航栏数据
export function getNavbarData(){
  return request({
    url:"/home/catitems"
  })
}
// 楼层数据
export function getFloorData(){
  return request({
    url:'/home/floordata'
  })
}