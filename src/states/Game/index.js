/* globals __DEV__ */
import Phaser from 'phaser'
import Model from './model'
import Map from './Map'
import UI from './UI'
import Countdown from './countdown'
import Modal from './UI/modal'
import Multiplicators from './UI/multiplicators'
import Gameover from './UI/card-gameover'
import Store from '.././Store'

export default class extends Phaser.State {
  init () {}

  createTimer (seconds) {
    const { levelTimer } = this.game.levelData
    const multiplicator = this.game.multiply.time || 1

    this.restGameTime = this.game.time.create()
    this.timerEvent = this.restGameTime.add(
      Phaser.Timer.SECOND * levelTimer * multiplicator,
      () => {
        this.SessionEnd()
        this.onSessionEnd.dispatch()
      },
      this
    )
  }

  preload () {
    const { levelData, multiplies } = this.game

    console.log('multiplies:', multiplies)

    this.game.multiply = levelData.multiply || {}

    this.game.multiply.click = 0
    this.game.multiply.duration = 1
    this.game.multiply.handicap = 0
    this.game.multiply.time = 1
    this.game.multiply.fortuneNegative = 1
    this.game.multiply.fortunePositive = 1

    console.log('this.game.multiply', this.game.multiply)

    if (this.game.multiplies) {
      this.game.multiplies.map(el => {
        if (el.clicks) this.game.multiply.click += el.clicks
        if (el.duration) this.game.multiply.duration -= el.duration
        if (el.handicap) this.game.multiply.handicap += el.handicap
        if (el.time) this.game.multiply.time += el.time
        if (el.fortuneNegative) this.game.multiply.fortuneNegative -= el.fortuneNegative
        if (el.fortunePositive) this.game.multiply.fortunePositive += el.fortunePositive
      })
    }

    console.log('this.game.multiply', this.game.multiply)

    this.createTimer()

    this.game.load.atlas('buildings', levelData.buildings.texture, levelData.buildings.atlas)
    this.game.load.image('bg', levelData.background)
    this.game.load.image('fg', levelData.foreground)
    this.game.load.image('fist', './ui/fist.png')
    switch (this.game.levelKey) {
      case '1996':
        this.game.load.image('cortege-image', './misc/cortege_1.png')
        break
      case '2000':
        this.game.load.image('cortege-image', './misc/cortege_1.png')
        break
      case '2004':
        this.game.load.image('cortege-image', './misc/cortege_2.png')
        break
      case '2008':
        this.game.load.image('cortege-image', './misc/cortege_4.png')
        break
      case '2012':
        this.game.load.image('cortege-image', './misc/cortege_3.png')
        break
      case '2018':
        this.game.load.image('cortege-image', './misc/cortege_4.png')
        break
      default:
        console.error('CORTEGE CONNOT LOAD')
    }

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

    this.store = new Store()

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
      callback: this.targetReached.dispatch(),
      amount: this.game.multiply.click
    })

    console.log('this.game.multiply.click', this.game.multiply.click)

    this.model.voterTurnout = Math.ceil(this.game.levelData.target * this.game.multiply.handicap)

    this.model.onAmountChange = (val) => {
      if (!val || typeof val !== 'number') return false
      this.ui.updateAmount(val)
    }
    this.ui.updateAmount(this.model.amount)

    this.model.onVoterTurnoutChange = (val) => {
      if (!val || typeof val !== 'number') return false
      if (this.model.voterTurnout >= this.game.levelData.target) {
        if (this.restGameTime.running) {
          this.SessionWon()
        }
      }
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
      this.model.amount += 1 //  * this.game.multiply.click // ? this.game.multiply.click : 1 //  * this.game.multiply.click
    }, this)

    this.ui.buttons.onActivateInstrument.add((cost, effency, duration) => {
      // console.log('cost', cost)
      // console.log('effency', effency)
      // console.log('duration', duration)
      if (this.model.amount < cost) return false
      const multipliedDuration = duration * this.game.multiply.duration
      this.model.amount -= cost
      for (var i = 0; i < effency; i++) {
        setTimeout(() => {
          this.model.voterTurnout += 1
        }, (multipliedDuration * 1000 / effency) * i)
      }
      this.ui.updateAmount(this.model.amount)
    }, this)
  }

  create () {
    this.map = this.add.existing(new Map(this.game))
    const modal = this.game.add.existing(new Modal(this.game))
    this.countdown = new Countdown(this.game)
    this.countdown.onFinish.add(() => {
      modal.destroy()
      this.ui = this.add.existing(new UI(this.game))
      this.createModel()
      this.createUi()
      this.restGameTime.start()
    }, this)
    this.countdown.startTimer()

    this.keyLoose = this.game.input.keyboard.addKey(Phaser.Keyboard.K)
    this.keyLoose.onDown.add(() => {
      this.SessionEnd()
    }, this)

    this.keyWin = this.game.input.keyboard.addKey(Phaser.Keyboard.L)
    this.keyWin.onDown.add(() => {
      this.SessionWon()
    }, this)

    // if (__DEV__) {
    //   if (!this.admin) this.admin = new Admin(this.game)
    // }
  }

  SessionEnd () {
    this.restGameTime.stop()
    this.ui.updateTimer(0)
    this.game.add.existing(new Modal(this.game))
    // const endGameText = 'Ваше время вышло.\nВам не удалось собрать явку и вы сорвали выборы!'
    // const info = this.game.add.existing(new Info({game: this.game, text: endGameText, type: 'negative'}))
    const gamoverCard = new Gameover({game: this.game})
    this.game.add.existing(gamoverCard)
  }

  selectMultiplicators () {
    this.modalOverlay.alpha = 0.5
    if (this.store.getLevelByKey(this.game.levelKey) < 5) {
      const mult = new Multiplicators(this.game, this.game.camera.width / 2, this.game.camera.height / 2, this.store.getLevelByKey(this.game.levelKey))
      mult.multiplicatorSelected.add(item => {
        if (!this.game.multiplies) this.game.multiplies = []
        this.game.multiplies.push(item)
        this.game.levelKey = this.store.getYearByKey(this.store.getLevelByKey(this.game.levelKey) + 1)
        this.state.start('LevelSelect')
      }, this)
      this.game.add.existing(mult)
      return true
    } else {
      this.game.camera.fade(0xffffff, 3000)
      this.game.camera.onFadeComplete.add(() => {
        this.state.start('Final')
      }, this)
    }
  }

  SessionWon () {
    this.restGameTime.stop()
    this.ui.updateTimer(0)
    this.map.cortegeStart()
    this.map.cortegeFinish.add(() => this.selectMultiplicators(), this)
    this.modalOverlay = this.game.add.existing(new Modal(this.game))
    this.modalOverlay.alpha = 0.1
  }

  update () {
    if (this.restGameTime.running) {
      if (this.ui && this.timerEvent.delay > this.restGameTime.ms) {
        const deltatime = this.timerEvent.delay - this.restGameTime.ms
        this.ui.updateTimer(deltatime)
      }
    }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.text(this.game.time.fps || '--', 480, 14, '#00ff00')
    }
  }
}
