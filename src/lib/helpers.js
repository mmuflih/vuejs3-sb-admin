import { VueCookieNext } from 'vue-cookie-next'

export function getErrorMessage (eres) {
  if (eres.response.status === 404) {
    return 'Router ' + eres.response.statusText
  }
  return eres.response.data.user_message
}

export function showErrorMessage (eres, toastr) {
  if (eres.response.status === 404) {
    const msg = 'Service Router ' + eres.response.statusText
    console.log(msg)
    toastr.error(msg)
    return []
  }
  if (eres.response.status === 500) {
    const msg = eres.response.statusText + ` [${eres.response.data.user_message}]`
    toastr.error(msg)
    return []
  }
  if (eres.response.status === 422) {
    if (eres.response.data.user_message) {
      toastr.error(eres.response.data.user_message)
      if (eres.response.data.errors) {
        return eres.response.data.errors
      }
      return []
    }
    const msg = eres.response.statusText
    toastr.error(msg)
    return eres.response.data
  }
  return eres.response.data
}

export function setCookie (data) {
  VueCookieNext.setCookie('__syslog', JSON.stringify(data.data))
}
