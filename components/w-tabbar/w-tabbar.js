// pages/goods_list/childCpn/w-navbar/w-navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    },
    // 要激活选中  索引
    currentIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(event){
      const index = event.currentTarget.dataset.index
      this.triggerEvent("titleChange", { index });
    }
  }
})
