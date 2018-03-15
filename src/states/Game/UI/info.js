import Phaser from 'phaser'

const textStyle = (game) => {
  return {
    font: `bold 25px Roboto`,
    align: 'center',
    fill: '#fdfdfd'
    // stroke: 'black'
    // strokeThickness: 3
  }
}

const COLORS = {
  'positive': 'green',
  'negative': 'red',
  'neutral': 'white'
}

const SOUNDS = {
  'positive': ['positive'],
  'negative': ['negative-1', 'negative-2'],
  'neutral': ['positive']
}

export default class extends Phaser.Sprite {
  constructor ({game, text = '', type = 'neutral'}) {
    super(game, game.camera.width / 2, game.camera.height * -0.5, 'ui-inerface', 'card-random')
    console.log('info', this.game)
    this.anchor.setTo(0.5)
    this.scale.setTo(game.scaleMap * 1.5)

    if (type === 'negative') this.frameName = 'random-bad'
    if (type === 'positive') this.frameName = 'random-good'

    this.caption = new Phaser.Text(this.game, 0, 0, text, textStyle(this.game))
    this.caption.anchor.setTo(0.5)
    // this.scale.setTo(game.scaleMap)
    this.caption.align = 'center'
    this.caption.wordWrap = true
    this.caption.wordWrapWidth = 400
    this.addChild(this.caption)

    const playSFX = () => {
      const name = this.game.rnd.pick(SOUNDS[type])
      const sfx = this.game.add.sound(`sfx-${name}`)
      sfx.allowMultiple = true
      sfx.play('', 0, 1, false)
      return sfx
    }

    playSFX()

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
