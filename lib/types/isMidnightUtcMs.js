const {
  isInteger
} = require('./isInteger')

function isMidnightUtcMs (_date) {
  if (!isInteger(_date))
    return false
  return _date % 100000 === 0
}

module.exports = {
  isMidnightUtcMs
}
