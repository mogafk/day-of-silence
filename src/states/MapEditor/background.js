import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  get scaleMap () {
    return this._scaleMap
  }
  constructor (game) {
    super(game, game.camera.width / 2, game.camera.height / 2, 'bg')
    this.anchor.setTo(0.5)
    this.scale.setTo(this.game.scaleMap)
  }
}
