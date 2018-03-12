import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {
    console.log('GAME STATE')
    // this.createNewButton = this.createNewButton.bind(this)
    // this.runGame = this.runGame.bind(this)
  }

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])
  }

  create () {
    this.state.start('LevelSelect')
  }

  runGame (name) {
    //   this.state.start(name)
  }
}
