Page({
  data: {
    tab: "tamato",
    lists: {
      "本周四": [{ time: "14:00", text: '41', id: 1 },
      { time: "16:00", text: '42', id: 2 },
      { time: "17:00", text: '43', id: 3 }],
      "本周五": [{ time: "18:00", text: '51', id: 4 }],
      "本周六": [{ time: "19:00", text: '61', id: 5 }],
      "本周日": [{ time: "20:00", text: '71', id: 6 }]
    }
  },
  onShow: function () {

  },
  changeTab(event) {
    let name = event.currentTarget.dataset.name
    this.setData({ tab: name })
  }
})