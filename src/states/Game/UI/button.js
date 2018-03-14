import Phaser from 'phaser'

const PRESS_ANIM_DURATION = 100
const PRESS_ANIM_EASING = Phaser.Easing.Cubic

export default class extends Phaser.Button {
  constructor ({game, x, y, icon, _idx, cost, effency, name = ''}) {
    super(game, x, y, 'ui-inerface')

    this.frameName = 'shadow'
    this._idx = _idx
    this.cost = cost
    this.effency = effency
    this.name = name
    this.locked = true
    this.inputEnabled = !this.locked
    this.activated = false

    this.scale.setTo((game.camera.height / 6) / 142)
    this.anchor.setTo(0.5)

    this.showHint = new Phaser.Signal()
    this.onPressed = new Phaser.Signal()

    this.icon = this.addChild(new Phaser.Sprite(game, 0, 0, 'ui-icons', icon))
    this.icon.anchor.setTo(0.5)

    const updateInput = () => {
      this.inputEnabled = !this.locked
      if (this.locked) return
      this.input.useHandCursor = true
      if (this.activated === false) {
        this.activated = true
        this.showHint.dispatch({ icon, cost, effency, name })
      }
    }

    const updateView = () => {
      this.icon.frameName = this.locked ? icon.replace('enable', 'disable') : icon
    }

    const updateStates = () => {
      updateInput()
      updateView()
    }

    this.checkAvailable = (amount) => {
      this.locked = this.cost > amount
      updateStates()
    }

    this.pressedAnimation = this.game.add
      .tween(this.scale)
      .to({x: '-0.1', y: '-0.1'}, PRESS_ANIM_DURATION, PRESS_ANIM_EASING.Out, false, 0)
      .chain(this.game.add
        .tween(this.scale)
        .to({x: '+0.1', y: '+0.1'}, PRESS_ANIM_DURATION, PRESS_ANIM_EASING.In, false, 0)
      )
    this.onInputUp.add(() => {
      if (!this.locked) {
        this.pressedAnimation.start()
        this.onPressed.dispatch()
      }
    })
  }
}
