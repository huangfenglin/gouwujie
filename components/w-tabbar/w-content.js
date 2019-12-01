// pages/goods_list/childCpn/w-navbar/w-navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Array,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(event){
      this.setData({
        currentIndex:event.currentTarget.dataset.index
      })
    }
  }
})
