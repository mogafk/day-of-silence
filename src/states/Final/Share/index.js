import Handlebars from 'handlebars/dist/handlebars.js'

import rawTemplate from 'raw-loader!./template.html'
import style from 'style-loader!css-loader!./style.css'

const template = Handlebars.compile(rawTemplate)

export default ({cb}) => {
  var res = {'currentURL': encodeURIComponent(window.location.href + `?_share=1`)}

  res['background'] = './assets/starters/win.png'
  res['title'] = 'Почетная грамота'
  res['text'] = 'За достижение целевых показателей в игре «День тишины», большой личный вклад в волеизъявление граждан и неизменно творческий подход к избирательному праву'
  res['signature'] = 'Центральная избирательная комиссия «Медиазоны»'
  res['buttontext'] = 'Играть еще раз'

  var html = template(res)

  const fragment = document.createElement('div')
  fragment.innerHTML = html
  document.body.appendChild(fragment)

  document.querySelector('#selector-for-button').onclick = function () {
    document.body.removeChild(fragment)
    cb()
  }
}
