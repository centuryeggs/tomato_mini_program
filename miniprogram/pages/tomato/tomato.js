const {
  http
} = require('../../lib/http.js')

Page({

  timer: null,

  data: {
    defaultSecond: 10,
    time: "",
    isRunning: true,
    abandonBox: false,
    finishedBox: false,
    timeOver: false,
    tomato: {},
    tomatoDescription: "",
  },

  onShow: function() {
    http.post('/tomatoes').then(response => {
      this.setData({
        tomato: response.data.resource
      })
    })
    this.startTime()
  },

  showTime() {
    let m = Math.floor(this.data.defaultSecond / 60)
    let s = Math.floor(this.data.defaultSecond % 60)
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    this.setData({
      time: m + ":" + s
    })
  },

  stopTime() {
    this.setData({
      isRunning: false
    })
    clearInterval(this.timer)
    this.timer = null
  },

  startTime() {
    if (this.data.defaultSecond === 0) {
      return
    }
    this.showTime()
    this.timer = setInterval(() => {
      this.data.defaultSecond--
        this.showTime()
      if (this.data.defaultSecond === 0) {
        this.setData({
          timeOver: true,
          finishedBox: true
        })
        this.stopTime()
      }
    }, 1000)
    this.setData({
      isRunning: true
    })
  },

  abandonConfirm(event) {
    console.log(event)
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: content,
        aborted: true
      })
      .then(response => {
        wx.switchTab({
          url: "/pages/home/home"
        })
      })
  },

  abandonCancel() {
    this.setData({
      abandonBox: false
    })
    this.startTime()
  },

  abandon() {
    this.stopTime()
    this.setData({
      abandonBox: true
    })
  },

  again() {
    this.setData({
      defaultSecond: 10,
      timeOver: false
    })
    this.startTime()
  },

  finishedConfirm(event) {
    if (event.detail){
      http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: event.detail,
        aborted: false
      }).then(response => {
        this.setData({
          finishedBox: false
        })
      })
    }
  },

  finishedCancel() {
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: event.detail,
      aborted: true
    }).then(response=>{
      this.setData({
        finishedBox: false
      })
    })
  },

  onHide() {
    this.stopTime()
    if (!timeOver) {
      http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: "退出放弃",
        aborted: true
      })
    }
  },

  onUnload() {
    this.stopTime()
    if (!this.data.timeOver) {
      http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: "退出放弃",
        aborted: true
      })
    }
  },
})