const { setContext } = require('@apollo/client/link/context')
const { default: { ACCESS_TOKEN_COOKIE_NAME } } = require('../../config')

function getAuthHeaderLink () {
  // return setContext(async () => {
  return setContext(() => {
    const headers = {}
    const accessToken = localStorage.getItem(ACCESS_TOKEN_COOKIE_NAME)
    if (accessToken)
      headers.Authorization = accessToken
    return { headers }
  })
}

module.exports = { getAuthHeaderLink }
