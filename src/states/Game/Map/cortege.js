import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, 0, 0)

    this.speed = 5

    const coords = (x, y) => {
      const {scaleMap} = game
      return {
        x: scaleMap * (x - y),
        y: scaleMap * ((x + y) / 2)
      }
    }

    let _c = {}
    _c = coords(-850, -200)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))
    _c = coords(-850, 200)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))
    _c = coords(-700, -200)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_4'))
    _c = coords(-700, 150)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_4'))
    _c = coords(-200, -200)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))
    _c = coords(200, -200)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))
    _c = coords(450, -200)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))
    _c = coords(700, -50)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))
    _c = coords(850, 0)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))
    this.addChild(new Phaser.Sprite(game, 0, 0, 'cortege', 'spec_3'))
    _c = coords(700, 50)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))
    _c = coords(450, 200)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))
    _c = coords(200, 200)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))
    _c = coords(-200, 200)
    this.addChild(new Phaser.Sprite(game, _c.x, _c.y, 'cortege', 'spec_2'))

    this.scale.setTo(-0.85, 0.85)
    this.x = this.game.camera.width * 1.5
    this.y = this.game.camera.height * -1.375
  }

  update () {
    this.x -= this.speed
    this.y += this.speed * 0.525
  }
}
