window.onload = function() {
  var mascotList = [{
    id: 'hijiki',
    label: '黑猫'
  },{
    id: 'z16',
    label: '粉色礼服'
  },{
    id: 'haruto',
    label: '男孩水手'
  },{
    id: 'shizuku',
    label: '课桌'
  },{
    id: 'koharu',
    label: '女孩水手'
  },{
    id: 'hibiki',
    label: '女仆'
  }]
  var date = new Date()
  var h = date.getHours()
  var mascot = mascotList[parseInt(h/4)].id
  var jsonPath = 'https://unpkg.com/live2d-widget-model-'+mascot+'@1.0.5/assets/'+mascot+'.model.json'
  L2Dwidget.init({
    model: {
      scale: 0.9,
      jsonPath: jsonPath
    },
    display: {
      vOffset: -40,
      hOffset: 50,
      superSample: 1
    },
    mobile: {
      show: false
    },
    react: {
      opacity: 1
    },
    dialog: {
      enable: true
    },
    div: {
      border: true
    }
  });
}