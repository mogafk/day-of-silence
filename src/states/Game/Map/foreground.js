import Phaser from 'phaser'
import Smoke from './smoke'

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, game.camera.width / 2, game.camera.height / 2, 'fg')
    this.anchor.setTo(0.5)
    this.scale.setTo(this.game.scaleMap)

    if (this.game.levelKey === '2004') {
      this.addChild(new Smoke(this.game, 400, -230))
      this.addChild(new Smoke(this.game, 575, -300))
      this.addChild(new Smoke(this.game, -520, -360, 1))
      this.addChild(new Smoke(this.game, -600, -320, 1))
      this.addChild(new Smoke(this.game, -700, -260, 1))
    }
  }
}
