Component({
  properties: {
    visible:{
      type: Boolean,
      value: ""
    },
    placeholder: {
      type: String,
      value: ""
    }
  },
  data:{
    value: ""
  },
  methods:{
    confirm(){
      this.triggerEvent('confirm', this.data.value)
      this.setData({value: ""})
    },
    cancel(){
      this.triggerEvent('cancel', '取消')
    },
    watchvalue(event){
      this.setData({ value: event.detail.value})
    }
  }

})
