import Phaser from 'phaser'

const HEIGHT = 460

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, game.camera.width / 2, game.camera.height / 2, 'ui-menu', 'card')
    this.anchor.setTo(0.5)
    this.scale.setTo(this.game.scaleMap)

    this.buttonRestart = this.addChild(this.game.add.sprite(0, HEIGHT * (-1 / 3), 'ui-menu', 'sound-on'))
    this.buttonRestart.anchor.setTo(0.5)

    this.buttonRestart = this.addChild(this.game.add.sprite(0, HEIGHT * (1 / 6), 'ui-menu', 'restart'))
    this.buttonRestart.anchor.setTo(0.5)

    this.alpha = 0
    this.show = () => { this.alpha = 1 }
    this.hide = () => { this.alpha = 0 }
  }
}
