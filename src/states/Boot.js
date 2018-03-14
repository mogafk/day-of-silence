import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    console.log('BOOT STATE')
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Roboto:300,700:cyrillic']
      },
      loading: () => console.log('fonts are loading...'),
      active: this.fontsLoaded,
      inactive: () => console.error('Huston, we have problem with fonts!'),
      fontloading: (familyName, fvd) => console.log('font is loading...', familyName, fvd),
      fontactive: (familyName, fvd) => console.log('font was load.', familyName, fvd),
      fontinactive: (familyName, fvd) => console.error('Huston, we have problem with font!', familyName, fvd)
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Roboto', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.crossOrigin = 'anonymous'
    // this.game.load.baseURL = './assets/'
    this.game.load.baseURL = '/day_of_silence/assets/'
    this.game.load.image('ui-modal', 'ui/modal.png')
    this.game.load.atlas('ui-icons', 'ui/icons.png', 'ui/icons.json')
    this.game.load.atlasJSONHash('ui-inerface', 'ui/interface.png', 'ui/interface.json')
    this.game.load.atlasJSONHash('cortege', 'misc/cortege.png', 'misc/cortege.json')
  }

  render () {
    if (this.fontsReady) {
      console.log('this.state.start')
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    console.log('ALL FONTS ARE LOADED')
    this.fontsReady = true
  }
}
