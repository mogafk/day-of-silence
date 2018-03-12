import Phaser from 'phaser'

const textStyle = (game) => {
  return {
    font: `${game.camera.height * 0.05}px Roboto`,
    align: 'center',
    color: 'white'
  }
}

export default class extends Phaser.Sprite {
  constructor ({game, icon, effency, cost, text = '', target}) {
    super(game, game.camera.width / 2, game.camera.height * -0.5, 'ui-inerface', 'card')
    this.anchor.setTo(0.5)
    this.scale.setTo(game.scaleMap)

    const image = this.addChild(game.make.sprite(0, -100, 'ui-icons', icon))
    image.anchor.setTo(0.5)
    image.scale.setTo(2)

    const descriptionText = this.addChild(game.make.text(0, 100, text, textStyle(game)))
    descriptionText.anchor.setTo(0.5)
    descriptionText.align = 'center'
    descriptionText.wordWrap = true
    descriptionText.wordWrapWidth = 300

    const costLabel = this.addChild(game.make.text(-50, 175, cost))
    costLabel.anchor.setTo(0, 0.5)
    costLabel.align = 'left'

    const effencyLabel = this.addChild(game.make.text(50, 175, effency))
    effencyLabel.anchor.setTo(0, 0.5)
    effencyLabel.align = 'left'

    if (!target) {
      target = {x: this.x, y: game.camera.height * 1.25, scale: 0.5}
    }
    const showOut = game.make.tween(this)
      .to({ x: target.x, y: target.y }, 1000, Phaser.Easing.Back.In, false, 1000)
    const showOutScale = game.make.tween(this.scale)
      .to({x: 0.1, y: 0.1}, 1000, Phaser.Easing.Back.In, false)
    const showOutAlpha = game.make.tween(this)
      .to({alpha: 0.75}, 1000, Phaser.Easing.Linear.None, false)
    showOut.onStart.add(() => {
      showOutScale.start()
      showOutAlpha.start()
    }, this)
    showOut.onComplete.add(() => {
      this.destroy()
    }, this)

    const showIn = game.make.tween(this)
      .to({ y: game.camera.height * 0.5 }, 1000, Phaser.Easing.Bounce.Out, false)
      .chain(showOut)

    showIn.start()
  }
}
