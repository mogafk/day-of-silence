import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, key) {
    super(game, 0, 0, 'buildings', key)
    this.tint = 0x000000
  }
}
