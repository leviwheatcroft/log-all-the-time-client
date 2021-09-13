const {
  isDateMs
} = require('../types')

const dayMs = 24 * 60 * 60 * 1000

function offsetByDaysMs (dateMs, offset) {
  console.assert(
    isDateMs(dateMs),
    { dateMs, message: 'dateMs !isDateMs' }
  )

  return dateMs + (offset * dayMs)
}

module.exports = {
  offsetByDaysMs
}
