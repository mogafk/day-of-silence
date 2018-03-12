export default class {
  get amount () {
    return this._amount
  }
  set amount (val) {
    this._amount = val
    if (typeof this.onAmountChange === 'function') this.onAmountChange(this._amount)
  }
  get voterTurnout () {
    return this._voterTurnout.value
  }
  set voterTurnout (val) {
    this._voterTurnout.value = val
    if (this.voterTurnout.value) this.voterTurnoutReached()
    if (typeof this.onVoterTurnoutChange === 'function') this.onVoterTurnoutChange(this._voterTurnout.value)
  }
  constructor ({target, callback}) {
    this.callback = callback
    this.voterTurnoutReached = () => this.callback()
    this._amount = 0
    this._voterTurnout = {
      value: 0,
      target: target
    }
  }
}
