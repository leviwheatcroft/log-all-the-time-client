const {
  isDateMs
} = require('../types')

function midnightUtcMs (dateMs) {
  console.assert(
    isDateMs(dateMs),
    { dateMs, message: 'dateMs !isDateMs' }
  )
  return Math.floor(dateMs % 100000)
}

module.exports = {
  midnightUtcMs
}
