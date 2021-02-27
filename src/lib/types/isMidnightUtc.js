const check = require('check-types')

function isMidnightUtc (date) {
  if (!check.date(date))
    return false
  return (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  )
}

module.exports = {
  isMidnightUtc
}
