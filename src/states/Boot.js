import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    // let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Roboto', fill: '#dddddd', align: 'center' })
    // text.anchor.setTo(0.5, 0.5)

    this.load.crossOrigin = 'anonymous'
    this.game.load.baseURL = './assets/'
    this.game.load.image('ui-modal', 'ui/modal.png')
    this.game.load.atlas('ui-icons', 'ui/icons.png', 'ui/icons.json')
    this.game.load.atlasJSONHash('ui-multiplicators', 'ui/multiplicators.png', 'ui/multiplicators.json')
    this.game.load.atlasJSONHash('ui-inerface', 'ui/interface.png', 'ui/interface.json')
    this.game.load.atlasJSONHash('cortege', 'misc/cortege.png', 'misc/cortege.json')
    this.game.load.atlasJSONHash('ui-menu', 'ui/menu.png', 'ui/menu.json')
    const sounds = [
      'card-away',
      'card',
      'gameover',
      'intro',
      'main-5sec',
      'main-15sec',
      'main-loop',
      'misc',
      'negative-1',
      'negative-2',
      'positive',
      'replay',
      'tap-1',
      'tap-2',
      'tap-3',
      'tool',
      'win'
    ]
    sounds.map(el =>
      this.game.load.audio(`sfx-${el}`, [`audio/${el}.mp3`, `audio/${el}.ogg`])
    )
  }

  render () {
    this.state.start('LevelSelect') // LevelSelect
  }
}
