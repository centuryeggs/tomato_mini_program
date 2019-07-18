const { http } = require('../../lib/http.js')

Page({
  data: {
    tab: "0",
    tomatoes: {},
    todos: {},
    me: {}
  },

  onShow: function() {
    this.fetchTodos()
    this.fetchTomatoes()
    this.setData({ me: wx.getStorageSync('me') })
  },

  fetchTomatoes(){
    http.get('/tomatoes', {
      is_group: "yes"
    }).then(response=>{
      this.setData({ tomatoes: response.data.resources})
    })
  },

  fetchTodos() {
    http.get('/todos/', {
      is_group: "yes"
    }).then(response => {
      this.setData  ({ todos: response.data.resources })
    })
  },
  swiperChange(event) {
    this.setData({ tab: event.detail.current })

  },
  changeTomato(event) {
    let name = event.currentTarget.dataset.name
    this.setData({ tab: '0' })

  },
  changeTask(event) {
    let name = event.currentTarget.dataset.name
    this.setData({ tab: '1' })
  }
})