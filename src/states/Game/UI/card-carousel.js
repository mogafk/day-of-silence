import Phaser from 'phaser'

const textStyle = (game) => {
  return {
    font: `${(game.camera.height * 0.02) / game.scaleMap}px Roboto`,
    align: 'center',
    fill: '#fdfdfd'
  }
}

export default class extends Phaser.Sprite {
  constructor ({game, icon, text = '', attendance}) {
    super(game, game.camera.width / 2, game.camera.height * -0.5, 'ui-inerface', 'card-empty')
    this.anchor.setTo(0.5)
    this.scale.setTo(game.scaleMap + 0.25)

    this.image = this.addChild(game.make.sprite(0, -100, 'ui-numbers', icon))
    this.image.anchor.setTo(0.5)
    this.image.scale.setTo(1.75)

    const descriptionText = this.addChild(game.make.text(0, 80, text, textStyle(game)))
    descriptionText.anchor.setTo(0.5)
    descriptionText.align = 'center'
    descriptionText.wordWrap = true
    descriptionText.wordWrapWidth = 300

    const attendanceText = this.addChild(game.make.text(0, 180, `Ваша цель — ${attendance}%`, textStyle(game)))
    attendanceText.anchor.setTo(0.5)
    attendanceText.align = 'center'
    attendanceText.wordWrap = true
    attendanceText.wordWrapWidth = 300
    attendanceText.fontSize = attendanceText.fontSize * 1.25
    attendanceText.fontWeight = 700

    this.descriptionText = descriptionText
  }

  showAsTiker () {
    this.x = this.game.camera.width * 0.5
    this.y = this.game.camera.height * 0.5
    this.scale.setTo(this.game.scaleMap * 1.5)
    this.moveLeft = true
  }

  set offsetX (val) {
    this._offsetX = val
  }
  set offsetSpeed (val) {
    this._offsetSpeed = val
  }
  update () {
    if (this.moveLeft) {
      const speed = this._offsetSpeed || 1
      this.x -= speed * this.game.scale.aspectRatio
      if (this.x < this.width / -2) {
        console.log('DELETE')
        const _offset = this._offsetX
        this.x = _offset //* this.game.scaleMap
      }
    }
  }
}
