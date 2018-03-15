import Phaser from 'phaser'
const TEXT_STYLE = (game) => {
  return {
    font: `bold ${game.camera.height * 0.075}px Roboto`,
    fill: '#fdfdfd', //  cb7a7b
    align: 'left'
    // stroke: '#000000',
    // strokeThickness: game.camera.height * 0.01
  }
}

export default class extends Phaser.Text {
  constructor (game, x, y, icon) {
    super(game, x, y, 0, TEXT_STYLE(game))
    this.anchor.setTo(0, 0.5)

    this.iconShadow = this.addChild(new Phaser.Sprite(game, 55 * game.scaleMap, -3, 'ui-inerface', 'shadow'))
    this.iconShadow.anchor.setTo(1, 0.5)
    this.iconShadow.scale.setTo(game.scaleMap * 0.75)

    this.icon = this.addChild(new Phaser.Sprite(game, 30 * game.scaleMap, -3, 'ui-icons', icon))
    this.icon.anchor.setTo(1, 0.5)
    this.icon.scale.setTo(game.scaleMap * 0.75)

    this.shadowFill = true
    this.shadowColor = '#20266a'
    this.shadowBlur = 20
    this.shadowOffsetX = 0
    this.shadowOffsetY = 0
    // this.setTextBounds(this.x - 50, this.y-50, this.width + 50, this.height + 50)

    const interactionTweenOut = this.game.add.tween(this.scale)
      .to({x: '-0.4', y: '-0.4'}, 200)
    const interactionTweenMiddle = this.game.add.tween(this.scale)
      .to({x: '-0.4', y: '-0.4'}, 200)
    const interactionTweenIn = this.game.add.tween(this.scale)
      .to({x: '+0.4', y: '+0.4'}, 300)
      .chain(interactionTweenOut)

    this.interactAnimate = () => {
      if (
        interactionTweenIn.isRunning ||
        interactionTweenOut.isRunning ||
        interactionTweenMiddle.isRunning
      ) return
      interactionTweenIn.start()
    }

    this.updateTextView = val => {
      this.printText(val)
      if (this.additional) this.text += this.additional
    }

    this.printText = text => {
      this.text = `  ${text}  `
    }
  }

  update () {}
}
