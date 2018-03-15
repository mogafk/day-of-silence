import Phaser from 'phaser'

const HEIGHT = 460
const FONT_STYLE = {
  font: `30px Roboto`,
  align: 'center',
  fill: '#fdfdfd'
}

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, game.camera.width / 2, game.camera.height / 2, 'ui-menu', 'card')
    this.anchor.setTo(0.5)
    this.scale.setTo(this.game.scaleMap)

    this.buttonSound = this.addChild(this.game.add.sprite(0, HEIGHT * (-1 / 4), 'ui-menu', 'sound-on'))
    this.buttonSound.anchor.setTo(0.5)
    this.buttonSound.inputEnabled = true
    this.buttonSound.input.priorityID = 100
    this.buttonSound.events.onInputUp.add(() => {
      this.game.paused = false
      this.game.sound.mute = !this.game.sound.mute
    }, this)

    const descriptionText = this.addChild(game.make.text(0, HEIGHT * (-1 / 10), 'звук', FONT_STYLE))
    descriptionText.anchor.setTo(0.5)
    descriptionText.align = 'center'
    descriptionText.wordWrap = true
    descriptionText.wordWrapWidth = 300

    this.buttonRestart = this.addChild(this.game.add.sprite(0, HEIGHT * (1 / 6), 'ui-menu', 'restart'))
    this.buttonRestart.anchor.setTo(0.5)
    this.buttonRestart.inputEnabled = true
    this.buttonRestart.input.priorityID = 100
    this.buttonRestart.events.onInputUp.add(() => {
      // if (this.restarEvent) this.restarEvent()
      this.game.paused = false
      this.game.state.start('Game')
    }, this)

    const restartText = this.addChild(game.make.text(0, HEIGHT * (1 / 3), 'заново', FONT_STYLE))
    restartText.anchor.setTo(0.5)
    restartText.align = 'center'
    restartText.wordWrap = true
    restartText.wordWrapWidth = 300

    this.alpha = 0
    this.show = () => { this.alpha = 1 }
    this.hide = () => { this.alpha = 0 }
  }
}
