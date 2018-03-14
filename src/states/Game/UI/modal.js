import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, 0, 0)

    this.bg = this.addChild(new Phaser.TileSprite(game, 0, 0, game.camera.width, game.camera.height, 'ui-modal'))
    this.bg.inputEnabled = true
  }
}
