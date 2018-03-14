import 'pixi'
import 'p2'
import Phaser from 'phaser'

import GameState from './states/Game'
import LevelSelect from './states/LevelSelect'
import BootState from './states/Boot'
import PreBootState from './states/PreBoot'
import SplashState from './states/Splash'
import MapEditor from './states/MapEditor'
import FinalState from './states/Final'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    let _w = docElement.clientWidth
    let _h = docElement.clientHeight
    _w / 16 < _h / 9
      ? _h = _w * (9 / 16)
      : _w = _h * (16 / 9)
    super(_w, _h, Phaser.WebGL, 'content', null)

    this.pixelRatio = 1 //  window.devicePixelRatio

    this.state.add('Game', GameState, false)
    this.state.add('Final', FinalState, false)
    this.state.add('LevelSelect', LevelSelect, false)
    this.state.add('MapEditor', MapEditor, false)
    this.state.add('PreBoot', PreBootState, false)
    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('PreBoot') //  Boot
    }
  }
}

window.game = new Game()

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
