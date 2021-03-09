function authLogIn (payload, state) {
  const {
    type,
    data: { user }
  } = payload
  if (type !== 'USER_LOG_IN')
    return
  state.auth.loggedIn = true
  state.auth.user = user
}

module.exports = {
  authLogIn
}
