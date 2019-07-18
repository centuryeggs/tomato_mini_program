Component({
  properties: {
    visible:{
      type: Boolean,
      value: ""
    },
    value: {
      type: String,
      value: ""
    },
    title: {
      type: String,
      value: ""
    }
  },
  data: {
    type: String,
    value: ""
  },
  lifetimes:{
    attached(){
      if(this.properties.value){
        this.properties.value = this.data.value
      }
    }
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
