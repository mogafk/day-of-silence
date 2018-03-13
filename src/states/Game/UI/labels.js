import { Group } from 'phaser'
import Label from './label'
import FillableLabel from './label-fillable'
import Timer from './timer'

export default class extends Group {
  constructor (game) {
    super(game)

    const verticalOffset = game.camera.height * 0

    this.amount = this.add(new Label(game, game.camera.width * 0.5, verticalOffset))
    this.updateAmountView = this.amount.updateTextView

    this.voterTurnout = this.add(new FillableLabel(game, game.camera.width * 0.8, verticalOffset))
    this.updateVoterTurnoutView = this.voterTurnout.updateTextView
    this.voterTurnout.target = this.game.levelData.target
    this.voterTurnout.additional = ` / ${this.game.levelData.target}`

    this.timer = this.add(new Timer(game, game.camera.width * 0.25, verticalOffset))
    this.updateTimerView = this.timer.updateTimeView
  }
}