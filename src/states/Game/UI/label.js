import Phaser from 'phaser'
const TEXT_STYLE = (game) => {
  return {
    font: `bold ${game.camera.height * 0.1}px Roboto`,
    fill: 'white',
    align: 'center',
    stroke: '#000000',
    strokeThickness: game.camera.height * 0.02
  }
}

export default class extends Phaser.Text {
  constructor (game, x, y, percentage = 33) {
    super(game, x, y, 0, TEXT_STYLE(game))
    this.anchor.setTo(0.5, 1)

    this.percentage = percentage

    this.fillable = this.addChild(game.make.text(0, 0, 0, TEXT_STYLE(game)))
    this.fillable.fill = 'red'
    this.fillable.anchor.setTo(0.5, 1)

    this._cropRectangle = new Phaser.Rectangle(0, 25, this.width, this.height - 25)

    // this.refreshCrop = () => {
    //   this._cropRectangle.width = this.width
    //   this._cropRectangle.height = this.height - 25  //this.height * this.percentage
    //   this.fillable.crop(this._cropRectangle)
    //   this.fillable.updateCrop()
    // }

    // this.refreshCrop()

    this.updateTextView = val => {
      this.text = val
      if (this.additional) this.text += this.additional
      if (this.fillable) this.fillable.text = this.text
      // this.refreshCrop()
    }    
  }

  setFillerPercentage (percents) {
    this.percentage = percents
  }

  update () {
    this._cropRectangle.width = this.width
    this._cropRectangle.height = this.height * 0.5  //this.height * this.percentage
    this.fillable.crop(this._cropRectangle)
    this.fillable.updateCrop()
    // e.height = this.height - this._height.h
    // this.fillable.y = this.height

  }
}
