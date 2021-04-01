import axios from 'axios'
import { VueCookieNext } from 'vue-cookie-next'

export const HTTPAUTH = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`
  }
})

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getAuthToken()
  }
})

export function objectToQuery (data) {
  return Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
}

export function getToken () {
  return getAuthData()
}

export function clearToken () {
  VueCookieNext.deleteCookie('__syslog')
}

export function authToken () {
  return getAuthToken()
}

function getAuthToken () {
  var auth = getAuthData()
  if (auth) {
    return auth.access_token
  }
  return ''
}

function getAuthData () {
  const auth = VueCookieNext.getCookie('__syslog')
  const authObj = JSON.parse(auth)
  var ts = Math.round((new Date()).getTime() / 1000)
  if (authObj && (ts < authObj.expired_at)) {
    return authObj
  }
  return null
}
