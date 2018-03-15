import Phaser from 'phaser'

export default class extends Phaser.Group {
  constructor (game, x, y, type = 2) {
    super(game)

    const keys = type === 1 ? ['1', '2', '3', '4', '5'] : ['6', '7', '8']
    const createCloud = () => {
      const key = this.game.rnd.pick(keys)
      const smoke1 = this.add(this.game.make.sprite(x, y, 'smoke', key))
      smoke1.scale.setTo(0.1)
      smoke1.alpha = 0
      smoke1.anchor.setTo(0.5, 1)
      const tween0 = this.game.add.tween(smoke1).to({alpha: 1}, 1000)
      const tween1 = this.game.add.tween(smoke1.scale).to({x: '+2', y: '+2'}, 10000)
      const tween2 = this.game.add.tween(smoke1).to({alpha: 0}, 9000)
      const tween3 = this.game.add.tween(smoke1).to({x: '+100', y: '-200'}, 10000)
      const tween4 = this.game.add.tween(smoke1).to({angle: '+45'}, 10000)
      tween0.start()
      tween0.chain(tween2)
      // tween.onComplete.add(()=>tween2.start(), this)
      tween1.start()
      tween3.start()
      tween4.start()
      tween4.onComplete.add(() => createCloud(), this)
    }

    for (let i = 0; i < 10; i++) {
      setTimeout(() => createCloud(), 1000 * i)
    }
  }
}
