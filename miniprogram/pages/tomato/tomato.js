Page({
  timer: null,
  data: {
    defaultSecond: 1500,
    time: "",
    isRunning: true,
    abandonBox: false,
    finishedBox: false,
    timeOver: false
  },
  showTime() {
    let m = Math.floor(this.data.defaultSecond / 60)
    let s = Math.floor(this.data.defaultSecond % 60)
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    this.setData({ time: m + ":" + s })
  },
  stopTime() {
    this.setData({ isRunning: false })
    clearInterval(this.timer)
    this.timer = null
  },
  startTime() {
    if (this.data.defaultSecond === 0) { return }
    this.showTime()
    this.timer = setInterval(() => {
      this.data.defaultSecond--
      this.showTime()
      if (this.data.defaultSecond === 0) {
        this.setData({ timeOver: true , finishedBox: true})
        this.stopTime()
      }
    }, 1000)
    this.setData({ isRunning: true })
  },
  abandonConfirm(e) {
    this.setData({ abandonBox: false })
    console.log(e.detail)
    wx.switchTab({
      url: "/pages/_home/_home"
    })
  },
  abandonCancel() {
    this.setData({ abandonBox: false })
    this.startTime()
  },
  abandon() {
    this.stopTime()
    this.setData({ abandonBox: true })
  },
  again() {
    this.setData({ defaultSecond: 1500, timeOver: false })
    this.startTime()
  },
  finishedConfirm(e) {
    this.setData({ finishedBox: false })
    console.log(e.detail)
    wx.switchTab({
      url: "/pages/_home/_home"
    })
  },
  finishedCancel(){
    this.setData({ finishedBox: false })
  },








  onShow: function () {
    this.startTime()
  },

  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})