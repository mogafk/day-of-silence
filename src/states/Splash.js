import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {
    // this.createNewButton = this.createNewButton.bind(this)
    // this.runGame = this.runGame.bind(this)
  }

  preload () {
    this.game.antialias = false
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])
  }

  create () {
    // alert(this.game.scale.compatibility.supportsFullScreen)
    this.game.add.button(0, 0, 'ui-splash-button', () => {
      // this.game.scale.startFullScreen()
      this.state.start('LevelSelect')
    }, this, 0, 0, 1, 0)
  }

  runGame (name) {
    //   this.state.start(name)
  }
}
