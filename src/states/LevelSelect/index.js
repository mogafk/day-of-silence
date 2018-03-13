/* globals __DEV__ */
import Phaser from 'phaser'
import levels from '.././levels.json'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.game.load.image('ui-bg', 'ui/bg.png')
    this.game.load.image('ui-level-select-button', 'ui/level-select-button.png')
  }

  create () {
    const {width: camW, height: camH} = this.game.camera
    const {width: bgW, height: bgH} = this.game.cache.getImage('ui-bg')
    const _scale = Math.min(camW / bgW, camH / bgH)
    const _bgSprite = this.game.add.sprite(camW * 0.5, camH * 0.5, 'ui-bg')
    _bgSprite.anchor.setTo(0.5)
    _bgSprite.scale.setTo(_scale)

    this.game.scaleMap = _scale
    const _buttons = Object.keys(levels)

    const buttons = _buttons.map((el, idx) => {
      const _button = this.game.add.button((200 * _scale) + (300 * _scale * idx) + camW / 6 / 200, camH / 2, 'ui-level-select-button')
      const _text = this.game.add.text(0, 0, el)
      _button.onInputUp.add(() => {
        this.game.levelData = levels[el]
        this.game.levelKey = el
        this.game.attendance = this.game.rnd.integerInRange(this.game.levelData.attendanceMin, this.game.levelData.attendanceMax)
        console.log('gamedata:', this.game.levelData)
        if (__DEV__ && this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
          this.state.start('MapEditor')
        } else {
          this.state.start('Game')
        }
      }, this)
      _text.anchor.setTo(0.5)
      _button.addChild(_text)
      return _button
    })

    buttons.forEach(el => {
      el.scale.setTo(_scale)
      el.anchor.setTo(0.5)
    }
    )
  }
}
