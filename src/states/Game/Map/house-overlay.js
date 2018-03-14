import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, key, duration) {
    super(game, 0, 0, 'buildings', key)
    this.tint = 0x000000

    const tween = this.game.add.tween(this).to({alpha: 0}, duration * 1000)
    tween.start()
  }
}
