import Phaser from 'phaser'
import Label from './label'

export default class extends Label {
  constructor (game, x, y, percentage = 0.01) {
    super(game, x, y)
    this.anchor.setTo(0.5)

    this.percentage = percentage
    this.target = 100

    this.updateTextView = val => {
      this.text = Math.round(parseInt(val) / parseInt(this.target) * 100)
      // if (this.additional) this.text += this.additional
    }

    // this.fillable = game.add.text(0, 0, 0, TEXT_STYLE(game))
    // this.fillable.fill = 'red'
    // this.fillable.anchor.setTo(0.5)
    // this.addChild(this.fillable)

    // this.rectMask = game.add.graphics(0, 0)
    // this.rectMask.anchor.setTo(0.5, 0)
    // this.rectMask.beginFill(0xffffff)
    // this.rectMask.drawRect(
    //   0,
    //   70 + 60,
    //   this.game.camera.width,
    //   65
    // )
    // this.rectMask.endFill()
    // this.rectMask.alpha = 0.25
    // this.fillable.mask = this.rectMask
    // this.game.add.existing(this.rectMask)

    // this.rectMask.y -= this.percentage * 58

    // this.updateTextView = val => {
    //   this.text = val
    //   if (this.additional) this.text += this.additional
    //   // if (this.fillable) this.fillable.text = this.text
    // }
  }

  setFillerPercentage (percents) {}
}
