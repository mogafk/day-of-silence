import Phaser from 'phaser'

const textStyle = (game) => {
  return {
    font: `bold ${game.camera.height * 0.06}px Roboto`,
    align: 'center',
    stroke: 'black',
    strokeThickness: game.camera.height * 0.005
  }
}

const COLORS = {
  'positive': 'green',
  'negative': 'red',
  'neutral': 'white'
}

export default class extends Phaser.Text {
  constructor ({game, text = '', type = 'neutral'}) {
    super(game, game.camera.width / 2, -50, text, textStyle(game))

    this.anchor.setTo(0.5)
    this.scale.setTo(game.scaleMap)
    this.align = 'center'
    this.fill = COLORS[type]
    this.wordWrap = true
    this.wordWrapWidth = 600

    const _tweenOut = game.make.tween(this)
      .to({ y: game.camera.height * 1.2 }, 500, Phaser.Easing.Back.In, false, 2500)

    const _tweenIn = game.make.tween(this)
      .to({ y: game.camera.height * 0.5 }, 1000, Phaser.Easing.Bounce.Out, false)
      .chain(_tweenOut)

    _tweenIn.start()
    _tweenOut.onComplete.add(() => {
      this.destroy()
    }, this)
  }
}