import Phaser from 'phaser'

import Background from './background'
import Foreground from './foreground'
import House from './house'

export default class extends Phaser.Group {
  constructor (game) {
    super(game)

    this.background = this.add(new Background(game))
    this.onInteract = new Phaser.Signal()

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
}
