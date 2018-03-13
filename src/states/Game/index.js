/* globals __DEV__ */
import Phaser from 'phaser'
import Model from './model'
import Map from './Map'
import UI from './UI'
import Admin from './Admin'
import Countdown from './countdown'

export default class extends Phaser.State {
  init () {}

  createTimer (seconds) {
    const { levelTimer } = this.game.levelData

    this.restGameTime = this.game.time.create()
    this.timerEvent = this.restGameTime.add(
      Phaser.Timer.SECOND * levelTimer,
      () => { this.onSessionEnd.dispatch() },
      this
    )
  }

  preload () {
    const { levelData } = this.game

    this.multiply = levelData.multiply || {}
    if (!this.multiply.clicks) this.multiply.clicks = 1
    if (!this.multiply.voterTurnoutSpeed) this.multiply.voterTurnoutSpeed = 1
    if (!this.multiply.handicap) this.multiply.handicap = 0
    if (!this.multiply.time) this.multiply.time = 1
    if (!this.multiply.fortuneNegative) this.multiply.fortuneNegative = 1
    if (!this.multiply.fortunePositive) this.multiply.fortunePositive = 1

    this.createTimer()

    this.game.load.atlas('buildings', levelData.buildings.texture, levelData.buildings.atlas)
    this.game.load.image('bg', levelData.background)
    this.game.load.image('fg', levelData.foreground)

    this.targetReached = new Phaser.Signal()
    this.onSessionEnd = new Phaser.Signal()

    this.onSessionEnd.add(() => {
      console.log('PAUSED')
      this.paused = true
    }, this)

    this.game.houses = levelData.buildings.locations

    console.log(this.game.attendance)

    this.keyRestart = this.game.input.keyboard.addKey(Phaser.Keyboard.R)
    this.keyRestart.onDown.add(() => {
      // this.restart()
      this.map.destroy()
      this.map = undefined
      this.ui.destroy()
      this.ui = undefined
      this.state.start('Game')
    }, this)

    if (__DEV__) {
      this.game.time.advancedTiming = true
    }
  }

  restart () {
    this.ui.destroy()
    this.ui = this.add.existing(new UI(this.game))
    this.createModel()
    this.createUi()
    this.createTimer()
  }

  createModel () {
    this.model = new Model({
      target: this.game.levelData.target,
      callback: this.targetReached.dispatch()
    })

    this.model.voterTurnout = Math.ceil(this.game.levelData.target * this.multiply.handicap)

    this.model.onAmountChange = (val) => {
      if (!val || typeof val !== 'number') return false
      this.ui.updateAmount(val)
    }
    this.ui.updateAmount(this.model.amount)

    this.model.onVoterTurnoutChange = (val) => {
      if (!val || typeof val !== 'number') return false
      this.ui.updateVoterTurnout(val)
    }
    this.ui.updateVoterTurnout(this.model.voterTurnout)
  }

  createUi () {
    this.ui.onRandomEvent.add((event) => {
      const _sign = event.type === 'positive' ? 1 : -1
      this.model.voterTurnout += _sign * (event.effency || 0)
    }, this)

    this.map.onInteract.add(() => {
      this.model.amount += 1 * this.multiply.clicks
    }, this)

    this.ui.buttons.onActivateInstrument.add((cost, effency, duration) => {
      console.log(this.model.amount, cost)
      if (this.model.amount < cost) return false
      this.model.amount -= cost // * this.multiply.cost
      // const _delta = ((3000 / 6) / effency)
      // var _timer = this.game.time.create(false)
      // var _effency = 0
      // var _counter = 0

      for (var i = 0; i < effency; i++) {
        setTimeout(() => {
          this.model.voterTurnout += 1
        }, (duration * 1000 / effency) * i)
      }
      //   const delta = {
      //     val: 0,
      //     target: effency,
      //     duration
      //   }
      //   this.game.add.tween(delta)
      //   _timer.loop(1000 / 6, () => {
      //     _effency += _delta
      //     this.model.voterTurnout += _delta
      //     if (_effency >= effency) {
      //       _timer.destroy()
      //       _timer = undefined
      //     }
      //   }, this)
      //   _timer.start()
      //   // * this.multiply.effency
      this.ui.updateAmount(this.model.amount)
    }, this)
  }

  create () {
    this.map = this.add.existing(new Map(this.game))
    this.countdown = new Countdown(this.game)
    this.countdown.onFinish.add(() => {
      this.ui = this.add.existing(new UI(this.game))
      this.createModel()
      this.createUi()
      this.restGameTime.start()
    }, this)
    this.countdown.startTimer()
    // if (__DEV__) {
    if (!this.admin) this.admin = new Admin(this.game)
    // }
  }

  update () {
    if (this.ui && this.timerEvent.delay > this.restGameTime.ms) {
      const deltatime = this.timerEvent.delay - this.restGameTime.ms
      this.ui.updateTimer(deltatime)
    }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.text(this.game.time.fps || '--', 480, 14, '#00ff00')
    }
  }
}
