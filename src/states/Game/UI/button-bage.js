import Phaser from 'phaser'

const FONT_STYLE = {
  font: '11pt Roboto',
  align: 'left'
}

export default class extends Phaser.Sprite {
  constructor (game, x, y, cost, effency) {
    super(game, x, y, 'ui-inerface', 'badge-blue')

    this.scale.setTo(1.2)
    this.anchor.setTo(0.5)

    const costText = this.addChild(new Phaser.Text(game, 0, 0, cost, FONT_STYLE))
    costText.fill = 'white'
    costText.anchor.setTo(0, 0.5)
    // costText.scale.setTo(0.6)
    costText.x = this.width * -0.22
    costText.y += 3
    // costText.smoothed = false

    // const effencyText = this.addChild(new Phaser.Text(game, 0, 0, `${Math.round(effency / this.game.levelData.target * 100)}%`, FONT_STYLE))
    const effencyText = this.addChild(new Phaser.Text(game, 0, 0, `${(effency * (this.game.attendance / 100) / this.game.levelData.target * 100).toFixed(1)}%`, FONT_STYLE))
    effencyText.fill = 'white'
    effencyText.anchor.setTo(0, 0.5)
    // effencyText.scale.setTo(0.6)
    effencyText.x = this.width * 0.1
    effencyText.y += 3
    // costText.smoothed = false

    this.setEnableState = () => {
      this.frameName = 'badge-blue'
    }
    this.setDisableState = () => {
      this.frameName = 'badge-gray'
    }
  }
}
