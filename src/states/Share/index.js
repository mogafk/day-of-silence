import Handlebars from 'handlebars/dist/handlebars.js'

import rawTemplate from 'raw-loader!./template.html'
import style from 'style-loader!css-loader!./style.css'

const template = Handlebars.compile(rawTemplate)
let BG_PATH = './assets/starters/'
if (__DEV__ == false) {
  BG_PATH = '/day_of_silence/assets/starters/'
}

const show = ({ cb, type = 'win' }) => {
  var res = { 'currentURL': encodeURIComponent(window.location.href + `?result=${type}&_share=1`) }

  if (type === 'win') {
    res['background'] = `${BG_PATH}win.png`
    res['title'] = 'Почетная грамота'
    res['text'] = 'За достижение целевых показателей в игре «День тишины», большой личный вклад в волеизъявление граждан и неизменно творческий подход к избирательному праву'
    res['signature'] = 'Центральная избирательная комиссия «Медиазоны»'
    res['buttontext'] = 'Играть еще раз'
  }

  if (type === 'fail') {
    res['background'] = `${BG_PATH}cover.png`
    res['title'] = 'День тишины. Симулятор выборов'
    res['text'] = 'Вбросы, карусели, надомники, геи на передержке, голосуй, а то проиграешь, купи еды в последний раз — идеальная избирательная кампания от «Медиазоны»'
    res['buttontext'] = 'Пройти еще раз'
  }

  var html = template(res)

  const fragment = document.createElement('div')
  fragment.innerHTML = html
  document.body.appendChild(fragment)

  var windowW = window.innerWidth;
  if (windowW > 990) {
    setTimeout(function () {
      document.body.style.overflow = 'hidden';
      document.querySelector('[tabindex="10"]').focus();
    }, 1000)
  }


  document.querySelector('#selector-for-button').onclick = function () {
    document.body.removeChild(fragment)
    if (windowW > 990) {
      document.body.style.overflow = 'auto';
    }
    cb()
  }
}

window.showModal = show;

export default show;