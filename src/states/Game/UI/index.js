import Phaser from 'phaser'
import Labels from './labels'
import Buttons from './buttons'
import Information from './info'
import Menu from './menu'
import MenuIcon from './menu-icon'

const Y_OFFSET = 0.06

export default class extends Phaser.Group {
  constructor (game) {
    super(game)

    this.buttons = new Buttons(game)
    this.labels = this.add(new Labels(game))
    this.labels.y += game.camera.height * Y_OFFSET
    this.updateAmount = val => {
      this.labels.updateAmountView(val)
      this.buttons.updateAvailable(val)
    }
    this.updateVoterTurnout = val => this.labels.updateVoterTurnoutView(val)
    this.updateTimer = val => this.labels.updateTimerView(val)
    this.showInfo = props => this.add(new Information(props))

    this.buttons.onRandomEvent.add(random => {
      this.onRandomEvent.dispatch(random)
      const infoLabel = {
        game,
        text: random.message || '',
        type: random.type
      }
      infoLabel.text += random.type === 'positive'
        ? `\n+${Math.round(random.effency / this.game.levelData.target * 100)}%`
        : `\n-${Math.round(random.effency / this.game.levelData.target * 100)}%`
      this.showInfo(infoLabel)
    }, this)

    this.onRandomEvent = new Phaser.Signal()

    this.menuIcon = this.add(new MenuIcon(this.game, this.game.camera.width * 0.95, this.game.camera.height * Y_OFFSET))
    this.menuWindow = this.add(new Menu(this.game))
    this.menuIcon.onOpen.add(() => this.menuWindow.show(), this)
    this.menuIcon.onClose.add(() => this.menuWindow.hide(), this)
  }

  showCard () {}

  showModal () {}
}
