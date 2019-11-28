import request from './network.js'

export function getCategories() {
  return request({
    url: "/categories"
  })
}