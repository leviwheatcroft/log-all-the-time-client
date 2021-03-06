const check = require('check-types')

function isFalse (_false) {
  return check.function(_false)
}

module.exports = {
  isFalse
}
