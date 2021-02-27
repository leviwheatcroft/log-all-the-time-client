const check = require('check-types')

function add (payload, state) {
  const {
    type,
    data: { date, duration }
  } = payload
  if (type !== 'DURATIONS_BY_DAY_ADD')
    return
  if (!check.date(date))
    throw new TypeError('date is not Date')
  if (!check.integer(duration))
    throw new TypeError('duration is not Integer')
  const day = state.durationByDay.days.find((d) => d.id === date.valueOf())
  if (day === undefined)
    return
  day.duration += duration
}

module.exports = {
  add
}
