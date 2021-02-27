const check = require('check-types')

const {
  dates: {
    offsetByDays
  }
} = require('../../lib')

function set (payload, state) {
  const {
    type,
    data: { days }
  } = payload
  const {
    durationByDay: {
      dateFrom,
      dateTo
    }
  } = state
  if (type !== 'DURATIONS_BY_DAY_SET')
    return
  const _days = []
  for (let d = dateFrom; d <= dateTo; d = offsetByDays(d, 1)) {
    const day = days.find((day) => day.id === d.valueOf())
    if (check.undefined(day)) {
      _days.push({
        id: d.valueOf(),
        date: d,
        duration: 0
      })
    } else {
      const {
        id,
        duration
      } = day
      if (!check.integer(id))
        throw new TypeError('id is not Integer')
      if (!check.integer(duration))
        throw new TypeError('duration is not Integer')
      _days.push({
        id,
        date: d,
        duration
      })
    }
  }
  state.durationByDay.days = _days
}

module.exports = {
  set
}
