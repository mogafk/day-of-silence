import Phaser from 'phaser'
import { GARestartLevel } from '../.././Analit'

const textStyle = (game) => {
  return {
    font: `16px Roboto`,
    align: 'center',
    fill: '#fdfdfd'
  }
}

export default class extends Phaser.Sprite {
  constructor ({game}) {
    super(game, game.camera.width / 2, game.camera.height * -0.5, 'ui-inerface', 'card-gamover')
    this.anchor.setTo(0.5)
    this.scale.setTo(game.scaleMap * 1.5)

    // this.image = this.addChild(game.make.sprite(0, -100, 'ui-icons', icon))
    // this.image.anchor.setTo(0.5)
    // this.image.scale.setTo(1.75)

    const text = 'Вы не справились с важным заданием\nК счастью, вы можете переиграть этот уровень'

    const descriptionText = this.addChild(game.make.text(0, 50, text, textStyle(game)))
    descriptionText.anchor.setTo(0.5)
    descriptionText.align = 'center'
    descriptionText.wordWrap = true
    descriptionText.wordWrapWidth = 300

    this.descriptionText = descriptionText

    const button = this.addChild(this.game.make.button(0, 150, 'ui-inerface',
      () => {
        GARestartLevel(this.game.levelKey)
        this.game.state.start('Game')
      },
      this, 'button-again', 'button-again', 'button-again', 'button-again')
    )
    button.input.priorityID = 98

    button.anchor.setTo(0.5)

    const showIn = game.make.tween(this)
      .to({ y: game.camera.height * 0.5 }, 1000, Phaser.Easing.Bounce.Out, false)

    showIn.start()
  }

  update () {}
}
