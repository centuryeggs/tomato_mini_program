const { http } = require('../../lib/http.js')
const { app_id, app_secret } = getApp().globalData

Page({
  data: {

  },

  login(event) {
    wx.login({
      success: (res)=> {
        this.loginMe(res.code, event.detail.iv, event.detail.encryptedData)
      }
    })
  },
  loginMe(code, iv, encrypted_data){
    http.post('/sign_in/mini_program_user',{
      code,
      iv,
      encrypted_data,
      app_id,
      app_secret
    })
    .then(response =>{
      wx.setStorageSync("me", response.data.resource)
      wx.setStorageSync('x-token', response.header["X-token"])
      wx.reLaunch({
        url: "/pages/home/home"
      })
    })
  }
})

