import Phaser from 'phaser'
import InstrumentButton from './button'
import Card from './card'
import Badge from './button-bage'
// import Flier from './flier'

export default class extends Phaser.Group {
  constructor (game) {
    super(game)
    const multiplierNegative = game.multiply.fortuneNegative
    const multiplierPositive = game.multiply.fortunePositive

    this.onActivateInstrument = new Phaser.Signal()
    this.onRandomEvent = new Phaser.Signal()

    game.levelData.instruments.map((el, idx) => {
      const { effency, cost, name, image: icon, duration } = el
      const x = 100 * game.scaleMap
      const y = game.camera.height / 6 * idx + game.camera.height / 15
      const button = this.add(new InstrumentButton(
        { game, x, y, cost, effency, icon, duration, name, _idx: idx }
      ))

      const badge = button.addChild(new Badge(game, 0, 50, cost, effency))
      button.onEnableState.add(() => { badge.setEnableState() }, this)
      button.onDisableState.add(() => { badge.setDisableState() }, this)

      const showCard = props => {
        const { icon, cost, effency, name: text } = props
        const target = { x: button.x, y: button.y }
        const card = new Card({ game, text, icon, effency, cost, target })
        this.addChild(card)
        card.showAsHint()
      }

      const multipledChance = (chance, type) => {
        if (type === 'positive') {
          return chance * multiplierPositive
        }
        if (type === 'negative') {
          return chance * multiplierNegative
        }
        return chance
      }

      const getRandomChioces = random => {
        if (random && random.length > 0) {
          return random.map(choice =>
            Phaser.Utils.chanceRoll(multipledChance(choice.chance, choice.type))
              ? choice
              : false
          ).filter(el => el)
        }
        return false
      }

      const generateRandomEvent = random => {
        const randomChioces = getRandomChioces(random)
        return randomChioces
          ? this.game.rnd.pick(randomChioces)
          : false
      }

      button.showHint.add(props => { showCard(props) }, this)
      button.onPressed.add(() => {
        this.onActivateInstrument.dispatch(el.cost, el.effency, el.duration)
        // for (let i = 0; i < 5; i++) {
        //   setTimeout(() => {
        //     const target = { x: this.game.scaleMap * 1.6 * 300, y: 50 * this.game.scaleMap }
        //     const flier = new Flier(game, button.x, button.y, target)
        //     this.addChild(flier)
        //   }, 50 * i)
        // }

        const randomEvent = generateRandomEvent(el.random)
        if (randomEvent) this.onRandomEvent.dispatch(randomEvent)
      }, this)
      return button
    })

    this.updateAvailable = val => {
      this.forEach(button => { if ('checkAvailable' in button) return button.checkAvailable(val) })
    }
  }
}
