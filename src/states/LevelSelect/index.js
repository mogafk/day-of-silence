/* globals __DEV__ */
import Phaser from 'phaser'
import levels from '.././levels.json'
import Card from '.././Game/UI/card'
import CardYear from '.././Game/UI/card-carousel'
import Info from '.././Game/UI/info'
import Store from '.././Store'

export default class extends Phaser.State {
  init () {}

  preload () {
    console.log('this.gameProgress', this.gameProgress)
    this.game.load.image('ui-bg-1996', 'starters/1996.png')
    this.game.load.image('ui-bg-2000', 'starters/2000.png')
    this.game.load.image('ui-bg-2004', 'starters/2004.png')
    this.game.load.image('ui-bg-2008', 'starters/2008.png')
    this.game.load.image('ui-bg-2012', 'starters/2012.png')
    this.game.load.image('ui-bg-2018', 'starters/2018.png')

    this.game.load.image('ui-level-select-button', 'ui/level-select-button.png')
    this.game.load.atlasJSONHash('ui-folders', 'ui/folders.png', 'ui/folders.json')
    this.game.load.atlasJSONHash('ui-numbers', 'ui/numbers.png', 'ui/numbers.json')
  }

  create () {
    const _buttons = Object.keys(levels)
    const {width: camW, height: camH} = this.game.camera
    const {width: bgW, height: bgH} = this.game.cache.getImage('ui-bg-1996')
    const _scale = Math.min(camW / bgW, camH / bgH)

    this.store = new Store()

    if (!this.game.levelKey) this.game.levelKey = '1996' //  = store.getYearByKey(store.progress)
    this.game.levelData = levels[this.game.levelKey]

    this.game.attendance = this.game.rnd.integerInRange(this.game.levelData.attendanceMin, this.game.levelData.attendanceMax)

    this.bgGroup = this.game.add.group()

    const _bgSprites = {
      '1996': `ui-bg-${_buttons[0]}`,
      '2000': `ui-bg-${_buttons[1]}`,
      '2004': `ui-bg-${_buttons[2]}`,
      '2008': `ui-bg-${_buttons[3]}`,
      '2012': `ui-bg-${_buttons[4]}`,
      '2018': `ui-bg-${_buttons[5]}`
    }

    this._bgSprite = this.game.make.sprite(camW * 0.5, camH * 0.5, _bgSprites[this.game.levelKey])
    this._bgSprite.anchor.setTo(0.5)
    this._bgSprite.scale.setTo(_scale)
    this.bgGroup.addChild(this._bgSprite)

    this.game.scaleMap = _scale

    let cardGroup = this.game.add.group()
    const createCards = (year) => {
      cardGroup.destroy()
      cardGroup = this.game.add.group()
      // cardGroup.forEach((el) => el.destroy())
      // const card = new Card({
      //   game: this.game,
      //   text,
      //   icon,
      //   effency,
      //   cost
      // })
      const yearCard = new CardYear({ game: this.game, text: this.game.levelData.briefing, attendance: this.game.attendance, icon: this.store.getLevelByKey(this.game.levelKey) })
      this.game.add.existing(yearCard)
      yearCard.showAsTiker()
      yearCard.x += 0
      yearCard.y += 25
      yearCard.offsetX = yearCard.width * 7
      yearCard.offsetSpeed = this.game.camera.width / 1920 * 2.5
      yearCard.image.scale.setTo(1)
      cardGroup.addChild(yearCard)

      for (var i = 0; i < 5; i++) {
        const {name: text, image: icon, effency, cost} = levels[year].instruments[i]
        const card = new Card({ game: this.game, text, icon, effency, cost })
        this.game.add.existing(card)
        card.showAsTiker()
        card.x += (i + 1) * yearCard.width
        card.y += 25
        card.offsetX = yearCard.width * 7
        card.offsetSpeed = this.game.camera.width / 1920 * 2.5
        card.image.scale.setTo(1.4)
        cardGroup.addChild(card)
      }
    }

    createCards(this.game.levelKey)

    // const __buttons = buttons.filter()

    const folders = _buttons.map((el, idx) => {
      if (idx > this.store.getLevelByKey(this.game.levelKey)) return false
      const folder = this.game.add.sprite(camW * 0.27, camH * 1.03, 'ui-folders', el)
      folder.anchor.setTo(0.5, 1)
      folder.scale.setTo(_scale * 1.5)
      folder.x += folder.width * (idx - 1) * 0.75
      if (el === this.game.levelKey) folder.y -= camH * 0.02
      // folder.inputEnabled = true
      // folder.input.useHandCursor = true
      // folder.events.onInputDown.add(() => {
      //   if (el === this.game.levelKey) return
      //   folders.map(el => { el.y = camH * 1.03; return true })
      //   folder.y -= camH * 0.02
      //   this.game.levelData = levels[el]
      //   this.game.levelKey = el
      //   createCards(el)
      //   this._bgSprite.destroy()
      //   this._bgSprite = this.game.make.sprite(camW * 0.5, camH * 0.5, _bgSprites[el])
      //   this._bgSprite.anchor.setTo(0.5)
      //   this._bgSprite.scale.setTo(_scale)
      //   this.bgGroup.addChild(this._bgSprite)
      // }, this)
      return folder
    }).filter(el => el)
    console.log(folders)
    if (folders.length === 6) folders[5].x += folders[5].width * 0.7

    const startButton = this.game.add.button(camW * 0.5, camH * 0.1, 'ui-inerface', () => {
      this.state.start('Game')
    }, this, 'button-play', 'button-play', 'button-play', 'button-play')
    startButton.scale.setTo(this.game.scaleMap * 1.25)
    startButton.anchor.setTo(0.5)

    // const infoLabel = new Info({
    //   game: this.game,
    //   text: 'cdnsjlcnjksdn vknaskjcns csn fdhjvbn  jlas dnbckjn ad khsbckjb sdfhncksbd kjcb ksvbfdsbhksbdfhbvhjsnd chkbskdbvhksnlc jhbskb vkjsdbfj  hvbhsk dbnck lbsfjdnv bhkds fnbhj lvbsdf klhjbvkjsdbhkd',
    //   type: 'positive'
    // })
    // console.log('infoLabel:', infoLabel)
    // this.game.add.existing(infoLabel)
    // infoLabel.x = this.game.camera.width / 2
    // infoLabel.y = 0

    // createCards('1996')

    // new Card(game,
    //   levels[el].instruments[0].image,
    //   levels[el].instruments[0].effency

    // )

    // const buttons = _buttons.map((el, idx) => {
    //   const _button = this.game.add.button((200 * _scale) + (300 * _scale * idx) + camW / 6 / 200, camH / 2, 'ui-level-select-button')
    //   const _text = this.game.add.text(0, 0, el)
    //   _button.onInputUp.add(() => {
    //     this.game.levelData = levels[el]
    //     this.game.levelKey = el
    //     this.game.attendance = this.game.rnd.integerInRange(this.game.levelData.attendanceMin, this.game.levelData.attendanceMax)
    //     console.log('gamedata:', this.game.levelData)
    //     if (__DEV__ && this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
    //       this.state.start('MapEditor')
    //     } else {
    //       this.state.start('Game')
    //     }
    //   }, this)
    //   _text.anchor.setTo(0.5)
    //   _button.addChild(_text)
    //   return _button
    // })

    // buttons.forEach(el => {
    //   el.scale.setTo(_scale)
    //   el.anchor.setTo(0.5)
    // }
    // )
  }
}
