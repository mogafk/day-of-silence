import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, game.camera.width / 2, game.camera.height / 2, 'fg')
    this.anchor.setTo(0.5)
    this.scale.setTo(this.game.scaleMap)
  }
}
