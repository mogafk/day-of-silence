import Phaser from 'phaser'
import Label from './label'

export default class extends Label {
  constructor (game, x, y, percentage = 0.01) {
    super(game, x, y, 'gui_enable_00002')
    // this.anchor.setTo(0.5)

    this.percentage = percentage
    this.target = 100

    // this.updateTextView = val => {
    //   // this.fill = 'red'
    //   // this.printText(`${Math.round(parseInt(val) / parseInt(this.target) * 100)}%`)
    //   // this.printText(`${parseInt(val)} ${Math.round(this.target)}`)
    //   // if (this.additional) this.text += this.additional
    // }

    // this.fillable = game.add.text(0, 0, 0, TEXT_STYLE(game))
    // this.fillable.fill = 'red'
    // this.fillable.anchor.setTo(0.5)
    // this.addChild(this.fillable)

    // this._bottomPos = this.height * 0.82
    // this._topPos = this.height * 0.25

    this._topPos = -36 * this.game.scaleMap
    this._bottomPos = 28 * this.game.scaleMap

    this.rectMask = game.add.graphics(0, 0)
    this.rectMask.anchor.setTo(0.5, 0)
    this.rectMask.beginFill(0xffffff)
    this.rectMask.drawRect(
      0,
      0,
      this.game.camera.width,
      65
    )
    this.rectMask.endFill()
    this.rectMask.alpha = 0.25
    // this.game.add.existing(this.rectMask)
    this.addChild(this.rectMask)
    this.mask = this.rectMask
    this.rectMask.y = this._bottomPos

    // this.rectMask.y -= this.percentage * 58

    // this.updateTextView = val => {
    //   this.text = val
    //   if (this.additional) this.text += this.additional
    //   // if (this.fillable) this.fillable.text = this.text
    // }
    console.log('Y:', this.height)

    this.fill = 'red'

    this.setFillerPercentage = this.setFillerPercentage.bind(this)
  }

  setFillerPercentage (percents) {
    this.rectMask.y = this._topPos + ((this._bottomPos - this._topPos) * (1 - percents))
    // this.rectMask.y = this.bottom - (this.height / 2) // bottom position
    // this.rectMask.y = this.top - (this.height * 0.1)
  }
}
