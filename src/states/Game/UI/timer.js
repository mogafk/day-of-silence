import Label from './label'

const formatTime = (s) => {
  var minutes = '' + Math.floor(s / 60000)
  var seconds = '0' + Math.floor(s / 1000 - minutes * 60)
  // var ms = '0' + s
  return minutes.substr(-2) + ':' + seconds.substr(-2) //  + ':' + ms.substr(4, 2)
}

export default class extends Label {
  constructor (game, x, y) {
    super(game, x, y, 'gui_enable_00004')

    // this.anchor.setTo(0.5)
    this.text = '00:00'

    this.updateTimeView = val => {
      this.printText(formatTime(Math.round(val)))
    }
  }
}
