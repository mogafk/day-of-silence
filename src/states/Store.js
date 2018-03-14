const LEVELS = {
  '1996': 0,
  '2000': 1,
  '2004': 2,
  '2008': 3,
  '2012': 4,
  '2018': 5
}

const YEARS = {
  0: '1996',
  1: '2000',
  2: '2004',
  3: '2008',
  4: '2012',
  5: '2018'
}

export default class {
  constructor () {
    this.loadProgress()
  }

  loadProgress () {
    const _progress = localStorage.getItem('silence_progress') || 0
    this._progress = parseInt(_progress)
  }
  saveProgress () {
    localStorage.setItem('silence_progress', this._progress)
  }

  getLevelByKey (key) {
    if (key < 0 || key > LEVELS.length - 1) return false
    return LEVELS[key]
  }

  getYearByKey (key) {
    if (key < 0 || key > YEARS.length - 1) return false
    return YEARS[key]
  }

  get progress () {
    return this._progress
  }
  set progress (val) {
    let _progress = Math.max(val, this._progress)
    if (_progress < 0) _progress = 0
    if (_progress > 5) _progress = 5
    this._progress = _progress
    this.saveProgress()
    this.loadProgress()
  }
}
