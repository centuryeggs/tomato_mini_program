const { http } = require('../../lib/http.js')

Page({

  data: {
    account: "",
    password: "",
  },

  watchAccount(event) {
    this.setData({
      account: event.detail.value,
    })
  },
  
  watchPassword(event) {
    this.setData({
      password: event.detail.value,
    })
  },

  submit(){
    http.post('/bindings', {
      account: this.data.account,
      password_digest: this.data.password_digest
    })
    .then(response=>{
      wx.setStorageSync("me", response.data.resource)
      wx.reLaunch({
        url: "/pages/home/home"
      })
    })
  },
})