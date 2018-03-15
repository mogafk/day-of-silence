// //  Игрок начал уровень (когда появился шагающий человек)
// const GAGameStart = () => {
//   let totalStarts = localStorage.getItem('dontleave_totalStarts') || 0
//   let lastEvent = localStorage.getItem('dontleave_lastEvent')
//   localStorage.setItem('dontleave_totalStarts', ++totalStarts)
//   if (window.ga) {
//     window.ga('send', 'event', 'dont_leave_the_room', 'total_start_try', totalStarts.toString(10))
//     if (lastEvent !== undefined && lastEvent !== null) {
//       window.ga('send', 'event', 'dont_leave_the_room', 'restart_after_event', lastEvent)
//     }
//   } else {
//     console.error('No GA in WINDOW')
//   }
// }

// //  Игрок умер
// const GAGameEnd = (sessionTime, totalTime, steps, event) => {
//   let totalEnds = localStorage.getItem('dontleave_totalEnds') || 0
//   localStorage.setItem('dontleave_totalEnds', ++totalEnds)
//   localStorage.setItem('dontleave_lastEvent', event)
//   if (window.ga) {
//     window.ga('send', 'event', 'dont_leave_the_room', 'total_ends', totalEnds.toString(10))
//     window.ga('send', 'event', 'dont_leave_the_room', 'death_session_time', sessionTime.toString(10))
//     window.ga('send', 'event', 'dont_leave_the_room', 'death_game_time', totalTime.toString(10))
//     window.ga('send', 'event', 'dont_leave_the_room', 'death_steps', steps.toString(10))
//     if (event) window.ga('send', 'event', 'dont_leave_the_room', 'death_event', event)
//   } else {
//     console.error('No GA in WINDOW')
//   }
// }

// //  Игрок нажимает на кнопку "Играть заново" после того как умер
// const GAGameReset = () => {
//   let totalStarts = localStorage.getItem('dontleave_totalStarts') || 0
//   if (window.ga) {
//     window.ga('send', 'event', 'dont_leave_the_room', 'restart_button_pressed', totalStarts.toString(10))
//   } else {
//     console.error('No GA in WINDOW')
//   }
// }

// //  Игрок нажимает на кнопку "Выйти из комнаты" на Интро
// const GALeaveTheRoom = () => {
//   let totalLeaves = localStorage.getItem('dontleave_totalLeaves') || 0
//   localStorage.setItem('dontleave_totalLeaves', ++totalLeaves)
//   if (window.ga) {
//     window.ga('send', 'event', 'dont_leave_the_room', 'total_leaves_home', totalLeaves.toString(10))
//   } else {
//     console.error('No GA in WINDOW')
//   }
// }

// //  Игрок нажимает на кнопку "Остаться дома" на Интро
// const GAStayAtHome = () => {
//   let totalStays = localStorage.getItem('dontleave_totalStays') || 0
//   localStorage.setItem('dontleave_totalStays', ++totalStays)
//   let currentStays = localStorage.getItem('dontleave_daysAtHome') || 0
//   if (window.ga) {
//     window.ga('send', 'event', 'dont_leave_the_room', 'total_stay_at_home', totalStays.toString(10))
//     window.ga('send', 'event', 'dont_leave_the_room', 'current_stay_at_home', currentStays.toString(10))
//   } else {
//     console.error('No GA in WINDOW')
//   }
// }

// //  Игрок нажимает на кнопку "Продолжить" после того как остался дома на Интро
// const GAContinueAfterWin = () => {
//   if (window.ga) {
//     window.ga('send', 'event', 'dont_leave_the_room', 'continue_after_stay_at_home')
//   } else {
//     console.error('No GA in WINDOW')
//   }
// }

// //  Игрок нажимает на кнопку "Играть" на Splash-экране
// const GAPlayGameButton = () => {
//   if (window.ga) {
//     window.ga('send', 'event', 'dont_leave_the_room', 'play_game')
//   } else {
//     console.error('No GA in WINDOW')
//   }
// }

const GAWin = () => {
  let totalWins = localStorage.getItem('silence_totalWins') || 0
  localStorage.setItem('silence_totalWins', ++totalWins)
  if (window.ga) {
    window.ga('send', 'event', 'silence_game', 'total_wins', totalWins.toString(10))
  } else {
    console.error('No GA in WINDOW')
  }
}

const GAStartLevel = (level) => {
  let totalStarts = localStorage.getItem('silence_totalStarts') || 0
  localStorage.setItem('silence_totalStarts', ++totalStarts)
  let levelStarts = localStorage.getItem(`silence_starts_${level}`) || 0
  localStorage.setItem(`silence_starts_${level}`, ++levelStarts)
  if (window.ga) {
    window.ga('send', 'event', 'silence_game', 'total_starts', totalStarts.toString(10))
    window.ga('send', 'event', 'silence_game', `starts_on_${level}`, levelStarts.toString(10))
  } else {
    console.error('No GA in WINDOW')
  }
}

const GALooseLevel = (level) => {
  let totalLooses = localStorage.getItem('silence_totalLooses') || 0
  localStorage.setItem('silence_totalLooses', ++totalLooses)
  let levelLooses = localStorage.getItem(`silence_looses_${level}`) || 0
  localStorage.setItem(`silence_looses_${level}`, ++levelLooses)
  if (window.ga) {
    window.ga('send', 'event', 'silence_game', 'total_looses', totalLooses.toString(10))
    window.ga('send', 'event', 'silence_game', `looses_on_${level}`, levelLooses.toString(10))
  } else {
    console.error('No GA in WINDOW')
  }
}

const GARestartLevel = (level) => {
  let totalRestarts = localStorage.getItem('silence_totalRestarts') || 0
  localStorage.setItem('silence_totalRestarts', ++totalRestarts)
  let levelRestarts = localStorage.getItem(`silence_restarts_${level}`) || 0
  localStorage.setItem(`silence_restarts_${level}`, ++levelRestarts)
  if (window.ga) {
    window.ga('send', 'event', 'silence_game', 'total_restarts', totalRestarts.toString(10))
    window.ga('send', 'event', 'silence_game', `restarts_on_${level}`, levelRestarts.toString(10))
  } else {
    console.error('No GA in WINDOW')
  }
}

// const GAUseInstrument = (name) => {
//   let totalRestarts = localStorage.getItem('silence_totalRestarts') || 0
//   localStorage.setItem('silence_totalRestarts', ++totalRestarts)
//   let levelRestarts = localStorage.getItem(`silence_restarts_${level}`) || 0
//   localStorage.setItem(`silence_restarts_${level}`, ++levelRestarts)
//   if (window.ga) {
//     window.ga('send', 'event', 'silence_game', 'total_restarts', totalRestarts.toString(10))
//     window.ga('send', 'event', 'silence_game', `restarts_on_${level}`, levelRestarts.toString(10))
//   } else {
//     console.error('No GA in WINDOW')
//   }
// }

export { GAWin, GAStartLevel, GALooseLevel, GARestartLevel }
