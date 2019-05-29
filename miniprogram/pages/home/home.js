// pages/_home/_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [{
      id: 1,
      text: "我今天干了1我今天干了1我今天干了1我今天干了1我今天干了1",
      finished: true
    }, {
      id: 2,
      text: "我今天干了3我今天干了3我今天干了3我今天干了3我今天干了3我今天干了3我今天干了3我今天干了3",
      finished: false
    }, {
      id: 3,
      text: "我今天干了3我今天干了3我今天干了3我今天干了3我今天干了3我今天干了3我今天干了3我今天干了3我今天干了3我今天干了3",
      finished: true
    },],
    visible: false,
  },
  completeTodo(event) {
    console.log(event)
    let index = event.currentTarget.dataset.index
    let isFinished = this.data.lists[index].finished
    if(isFinished){
      isFinished = !isFinished
      this.data.lists[index].finished = false
    }else{
      isFinished = !isFinished
      this.data.lists[index].finished = true
    }
    
    this.setData({ lists: this.data.lists })
  },
  confirmTodo(event) {
    if (event.detail) {
      let newtodo = { id: this.data.lists.length + 1, text: event.detail, finished: false }
      this.setData({
        lists: [...this.data.lists, newtodo]
      })
      this.hideInputBox()
    }
  },
  hideInputBox() {
    this.setData({
      visible: false
    })
  },
  showInputBox() {
    this.setData({
      visible: true
    })
  },

})