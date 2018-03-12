// import Phaser from 'phaser'
import dat from 'dat.gui'

export default class {
  constructor (game) {
    const { levelData } = game
    this.gui = new dat.GUI()

    this.gui.add(levelData, 'levelTimer')
    this.gui.add(levelData, 'target')
    if (!levelData.houseCapacity) levelData.houseCapacity = 10
    if (!levelData.reviveTime) levelData.reviveTime = 3
    this.gui.add(levelData, 'houseCapacity')
    this.gui.add(levelData, 'reviveTime')

    levelData.instruments.map((el, idx) => {
      const _folder = this.gui.addFolder(`Инструмент ${idx + 1}`)
      _folder.add(levelData.instruments[idx], 'cost')
      _folder.add(levelData.instruments[idx], 'effency')
      _folder.add(levelData.instruments[idx], 'duration')
      if (el.random) {
        el.random.map((subEl, subIdx) => {
          const _subfolder = _folder.addFolder(`Рандом ${subIdx + 1}`)
          if (!levelData.instruments[idx].random[subIdx].message) { levelData.instruments[idx].random[subIdx].message = '' }
          _subfolder.add(levelData.instruments[idx].random[subIdx], 'message')
          _subfolder.add(levelData.instruments[idx].random[subIdx], 'type', ['positive', 'negative'])
          _subfolder.add(levelData.instruments[idx].random[subIdx], 'chance')
          _subfolder.add(levelData.instruments[idx].random[subIdx], 'effency')
        })
      }
    })

    if (!levelData.multiply) levelData.multiply = {}
    const _folder2 = this.gui.addFolder(`Мультипликаторы`)
    if (!levelData.multiply.clicks) levelData.multiply.clicks = 1
    _folder2.add(levelData.multiply, 'clicks')
    if (!levelData.multiply.voterTurnoutSpeed) levelData.multiply.voterTurnoutSpeed = 1
    _folder2.add(levelData.multiply, 'voterTurnoutSpeed')
    if (!levelData.multiply.handicap) levelData.multiply.handicap = 0
    _folder2.add(levelData.multiply, 'handicap')
    if (!levelData.multiply.time) levelData.multiply.time = 1
    _folder2.add(levelData.multiply, 'time')
    if (!levelData.multiply.fortuneNegative) levelData.multiply.fortuneNegative = 1
    _folder2.add(levelData.multiply, 'fortuneNegative')
    if (!levelData.multiply.fortunePositive) levelData.multiply.fortunePositive = 1
    _folder2.add(levelData.multiply, 'fortunePositive')

    this.gui.remember(levelData)
  }
}
