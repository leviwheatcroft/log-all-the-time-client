const check = require('check-types')

function isUndefined (_undefined) {
  return check.undefined(_undefined)
}

module.exports = {
  isUndefined
}
