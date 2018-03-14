import Phaser from 'phaser'

const PRESS_ANIM_DURATION = 100
const PRESS_ANIM_EASING = Phaser.Easing.Cubic

export default class extends Phaser.Button {
  constructor ({game, x, y, icon, _idx, cost, effency, name = '', recovery = 2}) {
    super(game, x, y, 'ui-inerface')

    this.frameName = 'shadow'
    this._idx = _idx
    this.cost = cost
    this.effency = effency
    this.name = name
    this.locked = true
    this.inputEnabled = !this.locked
    this.activated = false
    this.recoveryTime = recovery * 1000
    this.recovering = false

    this.scale.setTo((game.camera.height / 6) / 142)
    this.anchor.setTo(0.5)

    this.showHint = new Phaser.Signal()
    this.onPressed = new Phaser.Signal()

    this.onEnableState = new Phaser.Signal()
    this.onDisableState = new Phaser.Signal()

    this.icon = this.addChild(new Phaser.Sprite(game, 0, 0, 'ui-icons', icon))
    this.icon.anchor.setTo(0.5)

    const updateInput = () => {
      this.inputEnabled = !this.locked && !this.recovering
      if (this.inputEnabled === false) return
      this.input.useHandCursor = true
      if (this.activated === false) {
        this.activated = true
        this.showHint.dispatch({ icon, cost, effency, name })
      }
    }

    const setEnableState = () => {
      this.onEnableState.dispatch()
      this.icon.frameName = icon
    }
    const setDisableState = () => {
      this.onDisableState.dispatch()
      this.icon.frameName = icon.replace('enable', 'disable')
    }

    const updateView = () => {
      if (this.locked || this.recovering) {
        setDisableState()
      } else {
        setEnableState()
      }
    }

    const updateStates = () => {
      updateInput()
      updateView()
    }

    const recoveringTween = this.game.add.tween(this.scale)
      .to({x: '+0.1', y: '+0.1'}, PRESS_ANIM_DURATION, PRESS_ANIM_EASING.In, false, this.recoveryTime - PRESS_ANIM_DURATION)
    recoveringTween.onComplete.add(() => {
      this.recovering = false
      updateStates()
    }, this)

    this.startRecovering = () => {
      this.recovering = true
      updateInput()
    }

    this.checkAvailable = (amount) => {
      this.locked = this.cost > amount
      updateStates()
    }

    this.pressedAnimation = this.game.add
      .tween(this.scale)
      .to({x: '-0.1', y: '-0.1'}, PRESS_ANIM_DURATION, PRESS_ANIM_EASING.Out, false, 0)
      .chain(recoveringTween)

    this.onInputUp.add(() => {
      if (!this.locked && !this.recovering) {
        this.startRecovering()
        this.pressedAnimation.start()
        this.onPressed.dispatch()
      }
    })
  }
}
