const {
  types: {
    isMidnightUtc
  }
} = require('../../lib')

function remove (payload, state) {
  const {
    type,
    data: { date, duration }
  } = payload
  if (type !== 'DURATIONS_BY_DAY_REMOVE')
    return
  console.assert(
    isMidnightUtc(date),
    { date, message: 'date is not midnightUtcMs' }
  )
  const day = state.durationByDay.days.find((d) => {
    return d.date.valueOf() === date.valueOf()
  })
  if (!day)
    return
  day.duration -= duration
}

module.exports = {
  remove
}
