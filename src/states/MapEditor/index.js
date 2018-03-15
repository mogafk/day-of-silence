import Phaser from 'phaser'
import Background from './background'
import Foreground from './foreground'
import House from './house'
import levels from '.././levels.json'

export default class extends Phaser.State {
  init () {}

  preload () {
    const { levelData } = this.game

    this.game.load.atlas('buildings', levelData.buildings.texture, levelData.buildings.atlas)
    this.game.load.image('bg', levelData.background)
    this.game.load.image('fg', levelData.foreground)

    //
  }

  save () {
    const _levels = levels
    const locations = []
    this.buildings.forEach(el => {
      const location = {
        x: el.relativeX(),
        y: el.relativeY(),
        building: el.frameName
      }
      locations.push(location)
    })
    this.game.levelData.buildings.locations = locations
    _levels[this.game.levelKey] = this.game.levelData
  }

  create () {
    const { levelData } = this.game
    this.bg = this.game.add.existing(new Background(this.game))

    this.selected = undefined

    this.buildings = this.game.add.group()

    levelData.buildings.locations.map(el => {
      const building = new House(this.game, el.x, el.y, el.building)
      building.onPressedSignal.add(() => { this.selected = building }, this)
      this.buildings.add(building)
    })

    this.fg = this.game.add.existing(new Foreground(this.game))

    this.keyCreate = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    this.keyCreate.onDown.add(() => {
      const _building = this.buildings.add(new House(this.game, 0.5, 0.5, 0))
      _building.onPressedSignal.add(() => { this.selected = _building }, this)
      this.selected = _building
    }, this)

    this.keyChangeUp = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE)
    this.keyChangeUp.onDown.add(() => {
      if (this.selected && this.selected.alive) {
        ++this.selected.frame
      }
    }, this)

    this.keyChangeDown = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO)
    this.keyChangeDown.onDown.add(() => {
      if (this.selected && this.selected.alive) {
        if (this.selected.frame === 0) this.selected.frame = 100
        --this.selected.frame
      }
    }, this)

    this.keyOnTop = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR)
    this.keyOnTop.onDown.add(() => {
      if (this.selected && this.selected.alive) {
        this.buildings.bringToTop(this.selected)
      }
    }, this)

    this.keyDelete = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE)
    this.keyDelete.onDown.add(() => {
      if (this.selected && this.selected.alive) this.selected.destroy()
      this.selected = undefined
    }, this)
  }

  update () {
    if (this.selected) {
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.selected.x -= 1
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.selected.x += 1
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.selected.y -= 1
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.selected.y += 1
      }
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      this.save()
    }
  }

  render () {
    // if (this.selected && this.selected.alive) this.game.debug.spriteInfo(this.selected, 20, 20)
  }
}
