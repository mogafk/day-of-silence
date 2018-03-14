import Phaser from 'phaser'

const textStyle = (game) => {
  return {
    font: `${(game.camera.height * 0.02) / game.scaleMap}px Roboto`,
    align: 'center',
    fill: '#fdfdfd'
  }
}

export default class extends Phaser.Sprite {
  constructor ({game, icon, effency, cost, text = '', target}) {
    super(game, game.camera.width / 2, game.camera.height * -0.5, 'ui-inerface', 'card')
    this.anchor.setTo(0.5)
    this.scale.setTo(game.scaleMap + 0.25)

    this.image = this.addChild(game.make.sprite(0, -100, 'ui-icons', icon))
    this.image.anchor.setTo(0.5)
    this.image.scale.setTo(1.75)

    const descriptionText = this.addChild(game.make.text(0, 80, text, textStyle(game)))
    descriptionText.anchor.setTo(0.5)
    descriptionText.align = 'center'
    descriptionText.wordWrap = true
    descriptionText.wordWrapWidth = 300

    this.descriptionText = descriptionText

    const costLabel = this.addChild(game.make.text(-30, 187, cost, textStyle(game)))
    costLabel.anchor.setTo(0, 0.5)
    costLabel.align = 'left'

    const effencyLabel = this.addChild(game.make.text(50, 187, effency, textStyle(game)))
    effencyLabel.anchor.setTo(0, 0.5)
    effencyLabel.align = 'left'

    if (!target) {
      target = {x: this.x, y: game.camera.height * 1.25, scale: 0.5}
    }
    const showOut = game.make.tween(this)
      .to({ x: target.x, y: target.y }, 1000, Phaser.Easing.Back.In, false, 1000)
    const showOutScale = game.make.tween(this.scale)
      .to({x: 0.1, y: 0.1}, 750, Phaser.Easing.Back.In, false)
    showOut.onStart.add(() => {
      showOutScale.start()
    }, this)
    showOut.onComplete.add(() => {
      this.destroy()
    }, this)

    const showIn = game.make.tween(this)
      .to({ y: game.camera.height * 0.5 }, 1000, Phaser.Easing.Bounce.Out, false)
      .chain(showOut)

    this._hint = showIn
  }

  showAsHint () {
    this._hint.start()
  }

  showAsTiker () {
    this.x = this.game.camera.width * 0.5
    this.y = this.game.camera.height * 0.5
    this.scale.setTo(this.game.scaleMap * 1.5)
    this.moveLeft = true
  }

  set offsetX (val) {
    this._offsetX = val
  }
  set offsetSpeed (val) {
    this._offsetSpeed = val
  }
  update () {
    if (this.moveLeft) {
      const speed = this._offsetSpeed || 1
      this.x -= speed * this.game.scale.aspectRatio
      if (this.x < 0 - this.width) {
        const _offset = this._offsetX
        this.x = _offset * this.game.scaleMap
      }
    }
  }
}
