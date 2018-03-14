import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.game.load.image('final', 'starters/win.png')
  }
  create () {
    const {width: camW, height: camH} = this.game.camera
    this._bgSprite = this.game.make.sprite(camW * 0.5, camH * 0.5, 'final')
    this._bgSprite.anchor.setTo(0.5)
    this._bgSprite.scale.setTo(this.game.scaleMap)
    this.game.add.existing(this._bgSprite)

    this.game.camera.flash(0xffffff, 3000)

    this.bgTween = this.game.add.tween(this._bgSprite.scale)
      .to({x: 1.5, y: 1.5}, 60000)

    this.bgTween.start()
  }
}
