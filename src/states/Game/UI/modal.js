import Phaser from 'phaser'

export default class extends Phaser.TileSprite {
  constructor (game) {
    super(game, 0, 0, game.camera.width, game.camera.height, 'ui-modal')
    this.inputEnabled = true
    this.input.priorityID = 97
    // this.bg = this.addChild(new Phaser.TileSprite(game, 0, 0, game.camera.width, game.camera.height, 'ui-modal'))
  }
}
