const {
  enumeration
} = require('./enumeration')

const AuthStatus = enumeration(
  'initialising',
  'loggedIn',
  'emailPendingVerification',
  'emailFailedVerification',
  'loggedOut'
)

module.exports = {
  AuthStatus
}
