import Phaser from 'phaser'
import config from '../../mult.json'

const TEXT_STYLE = {
  font: `19px Roboto`,
  align: 'center',
  fill: '#fdfdfd'
}

export default class extends Phaser.Sprite {
  constructor (game, x, y, level) {
    super(game, x, y, 'ui-inerface', 'card-multi')

    const multiplicators = config.multiplicators

    this.multiplicatorSelected = new Phaser.Signal()

    this.anchor.setTo(0.5)
    this.scale.setTo(this.game.scaleMap * 1.7)

    for (var i = 1; i <= 3; i++) {
      const item = i + (3 * (level))
      const mult = multiplicators[item - 1]
      const _x = -600 + (i * 300)
      const icon = this.game.make.sprite(_x, -75, 'ui-multiplicators', mult.icon)
      icon.anchor.setTo(0.5)
      this.addChild(icon)
      icon.inputEnabled = true
      icon.input.useHandCursor = true
      icon.input.priorityID = 98
      icon.events.onInputDown.add(() => {
        this.multiplicatorSelected.dispatch(mult)
        this.destroy()
      }, this)

      const text = this.game.make.text(_x, 50, mult.name, TEXT_STYLE)
      text.anchor.setTo(0.5)
      this.addChild(text)
      text.wordWrap = true
      text.wordWrapWidth = 300

      const text2 = this.game.make.text(_x, 80, mult.text, TEXT_STYLE)
      text2.anchor.setTo(0.5, 0)
      this.addChild(text2)
      text2.align = 'center'
      text2.wordWrap = true
      text2.wordWrapWidth = 270
      text2.lineSpacing = -5

      const text3 = this.game.make.text(_x, 220, mult.effect, TEXT_STYLE)
      text3.anchor.setTo(0.5)
      this.addChild(text3)
      text3.wordWrapWidth = 270
      text3.fontWeight = 700
      text3.wordWrap = true
      text3.fontSize = '25px'
      text3.lineSpacing = 0
    }
  }
}
