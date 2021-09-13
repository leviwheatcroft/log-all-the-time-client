const {
  enumeration
} = require('./enumeration')

const AuthState = enumeration(
  'initialising',
  'loggedIn',
  'emailPendingVerification',
  'emailFailedVerification',
  'loggedOut'
)

module.exports = {
  AuthState
}
