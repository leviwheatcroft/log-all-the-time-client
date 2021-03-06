const check = require('check-types')

function isArray (array) {
  return check.array(array)
}

module.exports = {
  isArray
}
