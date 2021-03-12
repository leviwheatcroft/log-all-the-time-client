const {
  state
} = require('../store')

function authentication (to, from, next) {
  if (
    to.name !== 'login' &&
    !state.auth.loggedIn
  )
    next({ name: 'login' })
  else
    next()
}

module.exports = {
  authentication
}
