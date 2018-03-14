import Phaser from 'phaser'

import Background from './background'
import Foreground from './foreground'
import House from './house'

export default class extends Phaser.Group {
  constructor (game) {
    super(game)

    this.background = this.add(new Background(game))
    this.onInteract = new Phaser.Signal()

    this.cortege = this.background.addChild(this.game.add.sprite(0, 0, 'cortege-image'))
    this.cortege.scale.setTo(0.6)
    this.cortege.anchor.setTo(0.5)

    this.isCortegeMove = false

    this.cortegeConfigs = {
      '1996': {
        x: -1500,
        y: -840,
        speedX: 2*2,
        speedY: 1.085*2
      },
      '2000': {
        x: -1500,
        y: -680,
        speedX: 2*2,
        speedY: 1.085*2
      },
      '2004': {
        x: 2000,
        y: -1200,
        speedX: -2*2,
        speedY: 1.085*2
      },
      '2008': {
        x: -1500,
        y: -700,
        speedX: 2*2,
        speedY: 1.085*2
      },
      '2012': {
        x: 1500,
        y: -780,
        speedX: -2*2,
        speedY: 1.085*2
      },
      '2018': {
        x: -1500,
        y: -700,
        speedX: 2*2,
        speedY: 1.085*2
      }
    }

    this.cortegeFinish = new Phaser.Signal()

    this.cortege.x = this.cortegeConfigs[this.game.levelKey].x
    this.cortege.y = this.cortegeConfigs[this.game.levelKey].y

    const houses = new Phaser.Group(game)
    this.add(houses)
    game.houses.map(el => {
      const _house = new House(game, el.x, el.y, el.building)
      houses.add(_house)
      _house.onInteract.add(() =>
        this.onInteract.dispatch()
      )
    })

    this.foreground = this.add(new Foreground(game))
  }

  cortegeStart () {
    this.isCortegeMove = true
    setTimeout(() => {
      console.log('TIMEOUT')
      this.cortegeFinish.dispatch()
    }, 6000)
  }

  update () {
    if (this.isCortegeMove) {
      this.cortege.x += this.cortegeConfigs[this.game.levelKey].speedX * 2
      this.cortege.y += this.cortegeConfigs[this.game.levelKey].speedY * 2
    }
  }
}
