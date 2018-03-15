/* globals __DEV__ */
import Phaser from 'phaser'
import Model from './model'
import Map from './Map'
import UI from './UI'
import Countdown from './countdown'
import Modal from './UI/modal'
import Multiplicators from './UI/multiplicators'
import Gameover from './UI/card-gameover'
import Menu from './UI/menu'
import MenuIcon from './UI/menu-icon'
import { GAStartLevel, GALooseLevel } from '.././Analit'

import Store from '.././Store'

export default class extends Phaser.State {
  init () {}

  createTimer (seconds) {
    const { levelTimer } = this.game.levelData
    const multiplicator = this.game.multiply.time || 1

    this.restGameTime = this.game.time.create()

    const timeValue = Phaser.Timer.SECOND * levelTimer * multiplicator

    this._15SecondsLeft = this.restGameTime.add(
      timeValue - (Phaser.Timer.SECOND * 16),
      () => {
        this.updateMusic(15)
      }
    )
    this._5SecondsLeft = this.restGameTime.add(
      timeValue - (Phaser.Timer.SECOND * 6),
      () => {
        this.updateMusic(5)
      }
    )
    this.timerEvent = this.restGameTime.add(
      timeValue,
      () => {
        this.SessionEnd()
        this.onSessionEnd.dispatch()
      },
      this
    )
  }

  preload () {
    const { levelData } = this.game

    this.game.multiply = levelData.multiply || {}
    this.game.multiply.click = 0
    this.game.multiply.duration = 1
    this.game.multiply.handicap = 0
    this.game.multiply.time = 1
    this.game.multiply.fortuneNegative = 1
    this.game.multiply.fortunePositive = 1

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

    this.createTimer()

    this.game.load.atlas('buildings', levelData.buildings.texture, levelData.buildings.atlas)
    this.game.load.image('bg', levelData.background)
    this.game.load.image('fg', levelData.foreground)
    this.game.load.image('fist', './ui/fist.png')
    switch (this.game.levelKey) {
      case '1996':
        this.game.load.image('ui-informer', './ui/informer.png')
        this.game.load.image('cortege-image', './misc/cortege_1.png')
        break
      case '2000':
        this.game.load.image('cortege-image', './misc/cortege_1.png')
        break
      case '2004':
        this.game.load.image('cortege-image', './misc/cortege_2.png')
        this.game.load.atlas('smoke', 'misc/smoke.png', 'misc/smoke.json')
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

  playSound (sound) {
    const sfx = this.game.add.sound(`sfx-${sound}`)
    sfx.play('', 0, 1, false)
    return sfx
  }

  create () {
    GAStartLevel(this.game.levelKey)
    this.game.sound.stopAll()
    this.music = this.game.add.sound('sfx-main-loop')
    this.music.play('', 0, 1, true)

    this.map = this.add.existing(new Map(this.game))
    const modal = this.game.add.existing(new Modal(this.game))
    modal.alpha = 0.1
    this.countdown = new Countdown(this.game)
    if (this.game.levelKey === '1996') {
      this.informer = this.game.add.sprite(this.game.camera.width * 0.5, this.game.camera.height * 0.5, 'ui-informer')
      this.informer.anchor.setTo(0.5)
      this.informer.scale.setTo(this.game.scaleMap * 1.5)
    }

    this.countdown.onFinish.add(() => {
      if (this.informer) this.informer.destroy()
      modal.destroy()
      this.ui = this.add.existing(new UI(this.game))
      this.createModel()
      this.createUi()
      this.restGameTime.start()
    }, this)
    this.countdown.startTimer()

    this.menuLayer = this.game.add.group()
    this.menuIcon = this.menuLayer.add(new MenuIcon(this.game, this.game.camera.width * 0.95, this.game.camera.height * 0.05))
    this.menuWindow = this.menuLayer.add(new Menu(this.game))
    this.menuIcon.onOpen.add(() => {
      this.menuModal = this.menuLayer.add(new Modal(this.game))
      this.menuLayer.bringToTop(this.menuIcon)
      this.menuLayer.bringToTop(this.menuWindow)
      this.menuWindow.show()
      this.ui.labels.visible = false
      this.ui.buttons.visible = false
    }, this)
    this.menuIcon.onClose.add(() => {
      if (this.menuModal) this.menuModal.destroy()
      this.menuWindow.hide()
      this.ui.labels.visible = true
      this.ui.buttons.visible = true
    }, this)
  }

  SessionEnd () {
    GALooseLevel(this.game.levelKey)
    this.updateMusic(0)
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
    this.music.fadeOut(500)
    this.playSound('win')
    this.restGameTime.stop()
    this.ui.updateTimer(0)
    this.map.cortegeStart()
    this.map.cortegeFinish.add(() => this.selectMultiplicators(), this)
    this.modalOverlay = this.game.add.existing(new Modal(this.game))
    this.modalOverlay.alpha = 0.1
  }

  updateMusic (val) {
    const _muse = name => {
      this.music.fadeOut(500)
      this.music.onFadeComplete.add(() => {
        this.music = this.game.add.sound(name)
        this.music.play('', 0, 1, true)
      }, this)
    }
    if (val === 15) {
      _muse('sfx-main-15sec')
      return true
    }
    if (val === 5) {
      _muse('sfx-main-5sec')
      return true
    }
    if (val === 0) {
      _muse('sfx-gameover')
      return true
    }
    if (val === 10) {
      _muse('sfx-intro')
      return true
    }
    return false
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
