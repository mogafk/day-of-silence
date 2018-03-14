import Phaser from 'phaser'
import Overlay from './house-overlay'

export default class extends Phaser.Sprite {
  get locked () {
    return this._locked
  }
  set locked (val) {
    this._locked = val
  }
  get rest () {
    return this._rest
  }
  set rest (val) {
    this._rest = val
    if (this._rest <= 0) this.onEmpty.dispatch()
  }
  constructor (game, sW, sH, key) {
    const CAPACITY = game.levelData.houseCapacity || 10
    const REVIVE_TIME = game.levelData.reviveTime || 3
    const _H = game.camera.height
    const _W = game.camera.width

    super(game, _W * sW, _H * sH, 'buildings', key)

    this.scale.setTo(this.game.scaleMap)
    this.anchor.setTo(0.5, 0)

    this.onInteract = new Phaser.Signal()
    this.onEmpty = new Phaser.Signal()

    const tweenOut = game.add.tween(this.scale).to({x: '+0.01', y: '+0.01'}, 100, Phaser.Easing.Back.Out, false)
    const tweenIn = game.add.tween(this.scale)
      .to({x: '-0.01', y: '-0.01'}, 100, Phaser.Easing.Back.In, false)
      .chain(tweenOut)

    const tweenReviveOut = game.add.tween(this.scale)
      .to({x: '-0.02', y: '-0.02'}, 75, Phaser.Easing.Back.In, false)
    const tweenReviveIn = game.add.tween(this.scale)
      .to({x: '+0.02', y: '+0.02'}, 75, Phaser.Easing.Back.Out, false)
      .chain(tweenReviveOut)

    const updateInput = () => {
      this.inputEnabled = !this.locked
      if (!this.input) return
      this.input.pixelPerfectOver =
        this.input.pixelPerfectClick =
          this.input.useHandCursor = true
    }
    const updateView = () => {
      if (!this.locked) return false
      this.overlay = new Overlay(game, key, REVIVE_TIME)
      this.overlay.anchor = this.anchor
      this.addChild(this.overlay)
    }
    const updateStates = () => {
      updateInput()
      updateView()
    }
    const unlock = () => {
      this.locked = false
      updateStates()
    }
    const lock = () => {
      this.locked = true
      updateStates()
    }
    const resetRestCapacity = () => {
      this.rest = CAPACITY
    }
    const decrementRestCapacity = () => {
      this.rest = this.rest - 1
    }
    const resetHouse = () => {
      unlock()
      tweenReviveIn.start()
      resetRestCapacity()
      if (this.overlay) this.overlay.destroy()
    }

    resetHouse()

    const touched = () => {
      if (this.locked) return false
      tweenIn.start()
      decrementRestCapacity()
      this.onInteract.dispatch()
    }
    this.events.onInputDown.add(() => touched(), this)

    this.onEmpty.add(() => {
      lock()
      setTimeout(resetHouse, REVIVE_TIME * 1000)
    }, this)
  }
}
