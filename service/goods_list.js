import request from './network.js'

export function getGoodsList(data){
  return request ({
    url: '/goods/search',
    data
  })
}
