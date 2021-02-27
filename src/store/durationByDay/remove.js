const check = require('check-types')

function remove (payload, state) {
  const {
    type,
    data: { date, duration }
  } = payload
  if (type !== 'DURATIONS_BY_DAY_REMOVE')
    return
  if (!check.date(date))
    throw new TypeError('date is not Date')
  if (!check.integer(duration))
    throw new TypeError('duration is not Integer')
  const day = state.durationByDay.days.find((d) => {
    return d.date.valueOf() === date.valueOf()
  })
  day.duration -= duration
}

module.exports = {
  remove
}
