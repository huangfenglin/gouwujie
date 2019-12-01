import request from './network.js'
export function getDetail(data){
  console.log(data);
  
  return request ({
    url: "/goods/detail",
    data
  })
}