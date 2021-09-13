const {
  isInteger
} = require('./isInteger')

function isDateMs (_dateMs) {
  return (
    isInteger(_dateMs) &&
    _dateMs > 1517443200000 && // 01/01/18
    _dateMs < 1975881600000 // 31/12/25
  )
}

module.exports = {
  isDateMs
}
