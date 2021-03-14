const check = require('check-types')

const dayMs = 24 * 60 * 60 * 1000

function offsetByDays (date, offset) {
  console.warn('offsetByDays deprecated')
  if (!check.date(date))
    throw new RangeError('date is not date')
  return new Date(date.valueOf() + (offset * dayMs))
}

module.exports = {
  offsetByDays
}
