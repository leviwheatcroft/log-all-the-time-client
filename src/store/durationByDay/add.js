const {
  types: {
    isMidnightUtc
  }
} = require('../../lib')

function add (payload, state) {
  const {
    type,
    data: { date, duration }
  } = payload
  if (type !== 'DURATIONS_BY_DAY_ADD')
    return
  console.assert(
    isMidnightUtc(date),
    { date, message: 'date is not midnightUtc' }
  )
  const day = state.durationByDay.days.find((d) => d.id === date.valueOf())
  if (day === undefined)
    return
  day.duration += duration
}

module.exports = {
  add
}
