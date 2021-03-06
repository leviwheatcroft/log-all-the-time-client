const check = require('check-types')

function isFunction (_function) {
  return check.function(_function)
}

module.exports = {
  isFunction
}
