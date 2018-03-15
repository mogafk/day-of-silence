import Phaser from 'phaser'

export default class extends Phaser.Button {
  // Button(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
  constructor (game, x, y) {
    super(game, x, y, 'ui-menu')
    this.anchor.setTo(0.5)
    this.scale.setTo(this.game.scaleMap)

    this.inputEnabled = true
    this.input.useHandCursor = true
    this.input.priorityID = 99

    this.frameName = 'open'
    this.open = false

    this.onOpen = new Phaser.Signal()
    this.onClose = new Phaser.Signal()

    this.events.onInputDown.add(() => {
      this.open = !this.open
      if (this.open) {
        this.game.paused = true
        this.frameName = 'close'
        this.onOpen.dispatch()
      } else {
        this.game.paused = false
        this.frameName = 'open'
        this.onClose.dispatch()
      }
    }, this)
  }
}
