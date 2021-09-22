const {
  assert
} = require('../types')

function midnightUtcMs (dateMs) {
  // console.log(dateMs)
  assert('isDateMs', dateMs)
  return Math.floor(dateMs / 86400000) * 86400000
}

module.exports = {
  midnightUtcMs
}
