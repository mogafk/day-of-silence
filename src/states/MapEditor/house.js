import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, sW, sH, key) {
    const _H = game.camera.height
    const _W = game.camera.width
    super(game, _W * sW, _H * sH, 'buildings', key)
    this.scale.setTo(this.game.scaleMap)
    this.anchor.setTo(0.5, 0)

    this.onPressedSignal = new Phaser.Signal()

    this.inputEnabled = true
    this.input.enableDrag(true)
    if (this.input) {
      this.input.pixelPerfectOver =
        this.input.pixelPerfectClick =
          this.input.useHandCursor = true
    }
    this.events.onInputDown.add(() => { this.onPressedSignal.dispatch() }, this)

    this.relativeX = () => {
      return (this.x / _W).toFixed(3)
    }
    this.relativeY = () => {
      return (this.y / _H).toFixed(3)
    }

    this.convertCoordinates = () => {
      return `${this.relativeX()} - ${this.relativeY()}`
    }

    // this.text = this.game.make.text(0, 0, this.convertCoordinates())
    // this.text.anchor.setTo(0.5)
    // this.text.y += this.height
    // this.addChild(this.text)
  }

  updateText () {
    // this.text.text = this.convertCoordinates()
  }

  update () {
    // this.text.text = this.convertCoordinates()
  }
}
