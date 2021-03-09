function authLogOut (payload, state) {
  const {
    type
  } = payload
  if (type !== 'USER_LOG_OUT')
    return
  state.auth.loggedIn = false
  state.auth.user = {}
}

module.exports = {
  authLogOut
}
