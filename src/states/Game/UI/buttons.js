import Phaser from 'phaser'
import InstrumentButton from './button'
import Card from './card'
import Badge from './button-bage'

export default class extends Phaser.Group {
  constructor (game) {
    super(game)

    console.log(game)
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

      button.addChild(new Badge(game, 0, 50, cost, effency))

      const showCard = props => {
        const { icon, cost, effency, name: text } = props
        const target = { x: button.x, y: button.y }
        const card = new Card({ game, text, icon, effency, cost, target })
        this.game.add.existing(card)
        card.showAsHint()
      }

      const multipledChance = chance =>
        chance.chance *
        chance.type === 'positive'
          ? multiplierPositive
          : chance.type === 'negative'
            ? multiplierNegative
            : 1

      const getRandomChioces = random => {
        return (random && random.length > 0)
          ? random
            .map(choice =>
              Phaser.Utils.chanceRoll(multipledChance(choice))
                ? choice
                : false
            )
            .filter(el => el)
          : false
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
        const randomEvent = generateRandomEvent(el.random)
        if (randomEvent) this.onRandomEvent.dispatch(randomEvent)
      }, this)
      return button
    })

    this.updateAvailable = val => {
      this.forEach(button => button.checkAvailable(val))
    }
  }
}
