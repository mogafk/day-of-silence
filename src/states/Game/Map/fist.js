import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, x, y, target) {
    super(game, x, y, 'fist')

    this.scale.setTo(game.scaleMap * 2.5)

    const animPing = game.add.tween(this).to({'y': '-30'}, 600, Phaser.Easing.Elastic.Out, true)
    const animFly = game.add.tween(this).to(target, 1000, Phaser.Easing.Back.In, false)
    const animScale = game.add.tween(this.scale).to({x: 0.2, y: 0.2}, 1000, Phaser.Easing.Back.In, false)

    animPing.onComplete.add(() => {
      animFly.start()
      animScale.start()
    }, this)

    animScale.onComplete.add(() => this.destroy(), this)
  }
}
