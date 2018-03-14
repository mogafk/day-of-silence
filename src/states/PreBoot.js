import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsLoadedSignal = new Phaser.Signal()
    this.fontsLoadedSignal.add(() => {
      setTimeout(() => {
        this.state.start('Boot')
      }, 500)
    }, this)
  }

  preload () {
    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    WebFont.load({
      google: {
        families: ['Roboto']
      },
      loading: () => console.log('fonts are loading...'),
      active: () => this.fontsLoadedSignal.dispatch(),
      inactive: () => console.error('Huston, we have problem with fonts!'),
      fontloading: (familyName, fvd) => console.log('font is loading...', familyName, fvd),
      fontactive: (familyName, fvd) => console.log('font was load.', familyName, fvd),
      fontinactive: (familyName, fvd) => console.error('Huston, we have problem with font!', familyName, fvd)
    })
  }

  render () {}
}
