const { http } = require('../../lib/http.js')
Page({
  data: {
    lists: [],
    visible: false,
  },

  onShow(){
    http.get('/todos?completed=false').then(response=>{
      this.setData({ lists: response.data.resources })
    })
  },
  completeTodo(event) {
    
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
    let content = event.detail
    if (event.detail) {
    http.post('/todos', { completed: false, 
      description: content })
      .then(response=>{
        this.setData({
          lists: [response.data.resource, ...this.data.lists]
        })
      })
      this.hideInputBox()
      console.log(this.data.lists)
    }
    // if (event.detail) {
    //   let newtodo = { id: this.data.lists.length + 1, text: event.detail, finished: false }
    //   this.setData({
    //     lists: [...this.data.lists, newtodo]
    //   })
    //   this.hideInputBox()
    // }
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