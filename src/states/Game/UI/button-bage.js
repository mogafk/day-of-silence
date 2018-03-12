import Phaser from 'phaser'

const FONT_STYLE = {
  font: '20pt Roboto'
}

export default class extends Phaser.Sprite {
  constructor (game, x, y, cost, effency) {
    super(game, x, y, 'ui-inerface', 'badge-blue')

    this.scale.setTo(1.25)
    this.anchor.setTo(0.5)

    const costText = this.addChild(new Phaser.Text(game, 0, 0, cost, FONT_STYLE))
    costText.fill = 'white'
    costText.anchor.setTo(0.5)
    costText.scale.setTo(0.6)
    costText.x = this.width * -0.125
    costText.y += 2

    const effencyText = this.addChild(new Phaser.Text(game, 0, 0, effency, FONT_STYLE))
    effencyText.fill = 'white'
    effencyText.anchor.setTo(0.5)
    effencyText.scale.setTo(0.6)
    effencyText.x = this.width * 0.25
    effencyText.y += 2
  }
}
