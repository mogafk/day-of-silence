import { Group } from 'phaser'
import Label from './label'
import FillableLabel from './label-fillable'
import Timer from './timer'

export default class extends Group {
  constructor (game) {
    super(game)

    const verticalOffset = game.camera.height * 0
    const _scale = game.scaleMap * 1.6

    this.timer = this.add(new Timer(game, 475 * _scale, verticalOffset))
    this.updateTimerView = this.timer.updateTimeView

    this.amount = this.add(new Label(game, 650 * _scale, verticalOffset, 'gui_enable_00006'))
    this.updateAmountView = this.amount.updateTextView

    this.voterTurnout = this.add(new Label(game, 300 * _scale, verticalOffset, 'gui_enable_00002'))
    this.voterTurnout.target = this.game.levelData.target

    this.voterTurnout2 = this.add(new FillableLabel(game, 300 * _scale, verticalOffset))
    this.voterTurnout2.target = this.game.levelData.target
    // this.voterTurnout2.setFillerPercentage(0.5)

    this.voterTurnout.updateTextView(`${this.game.attendance}%`)
    this.voterTurnout2.updateTextView(`${this.game.attendance}%`)

    this.interactVoterTurnout = () => {
      this.voterTurnout.interactAnimate()
      this.voterTurnout2.interactAnimate()
    }

    this.updateVoterTurnoutView = val => {
      // this.voterTurnout2.setFillerPercentage(parseInt(val) / this.game.levelData.target)

      this.voterTurnout2.setFillerPercentage(parseInt(val) / this.game.levelData.target)
      // this.voterTurnout2.updateTextView(val)
    }
  }
}
