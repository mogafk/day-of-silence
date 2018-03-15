import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'ui-menu', 'sound-on')
    this.anchor.setTo(0.5)
    this.inputEnabled = true
    this.input.useHandCursor = true
    this.input.priorityID = 100
    this.events.onInputUp.add(() => {
      this.game.sound.mute = !this.game.sound.mute
    }, this)
  }
}
