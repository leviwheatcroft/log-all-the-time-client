const { setContext } = require('@apollo/link-context')

function getAuthHeaderLink () {
  return setContext(() => {
    const headers = {}
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken)
      headers.Authorization = accessToken
    return { headers }
  })
}

module.exports = { getAuthHeaderLink }
