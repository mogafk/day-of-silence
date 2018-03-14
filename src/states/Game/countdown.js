import Phaser from 'phaser'
const START_DELAY = 3

const TEXT_STYLE = (game) => {
  return {
    font: `bold ${game.camera.height * 0.1}px Roboto`,
    fill: 'white',
    align: 'center',
    stroke: '#000000',
    strokeThickness: game.camera.height * 0.01
  }
}

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, 0, 0)
    this.onFinish = new Phaser.Signal()

    this._text = this.addChild(
      new Phaser.Text(
        game,
        game.camera.width * 0.5,
        game.camera.height * 0.5,
        START_DELAY,
        TEXT_STYLE(game)
      )
    )

    game.add.existing(this)
  }

  startTimer () {
    for (var i = 0; i < START_DELAY; i++) {
      const a = i
      setTimeout(() => {
        this._text.text = START_DELAY - a
      }, a * 1000)
    }

    setTimeout(() => {
      this.onFinish.dispatch()
      this.destroy()
    }, START_DELAY * 1000)
  }
}
