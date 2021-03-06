const check = require('check-types')

function isUser (_user) {
  const {
    id,
    username
  } = _user
  return (
    check.string(id) &&
    check.string(username)
  )
}

module.exports = {
  isUser
}
