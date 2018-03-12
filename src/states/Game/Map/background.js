import Phaser from 'phaser'
import Cortege from './cortege'

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, game.camera.width / 2, game.camera.height / 2, 'bg')
    this.anchor.setTo(0.5)
    this.scale.setTo(this.game.scaleMap)

    this.cortege = this.addChild(new Cortege(game))
  }

  update () {
    this.cortege.update()
  }
}
