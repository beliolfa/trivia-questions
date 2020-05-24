import translate, { setCORS } from 'google-translate-api-browser'
setCORS('http://cors-anywhere.herokuapp.com/')

export default function({}, inject) {
  inject('translate', translate)
}
