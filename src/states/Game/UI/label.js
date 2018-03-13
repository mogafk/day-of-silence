import Phaser from 'phaser'
const TEXT_STYLE = (game) => {
  return {
    font: `bold ${game.camera.height * 0.075}px Roboto`,
    fill: 'white',
    align: 'center',
    // stroke: '#000000',
    // strokeThickness: game.camera.height * 0.01
  }
}

export default class extends Phaser.Text {
  constructor (game, x, y) {
    super(game, x, y, 0, TEXT_STYLE(game))
    this.anchor.setTo(0.5)

    this.shadowFill = true
    this.shadowColor = '#20266a'
    this.shadowBlur = 20
    this.shadowOffsetX = 0
    this.shadowOffsetY = 0
    // this.setTextBounds(this.x - 50, this.y-50, this.width + 50, this.height + 50)

    this.updateTextView = val => {
      this.text = `  ${val}  `
      if (this.additional) this.text += this.additional
    }
  }

  update () {}
}
