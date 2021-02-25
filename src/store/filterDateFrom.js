const check = require('check-types')
const {
  types: {
    isMidnightUtc
  }
} = require('../lib')

function filterDateFrom (payload, state) {
  const {
    type,
    data: { dateFrom }
  } = payload
  if (type !== 'FILTER_DATE_FROM')
    return
  if (!check.date(dateFrom))
    throw new RangeError('dateFrom is not instanceof Date')
  if (!isMidnightUtc(dateFrom))
    throw new RangeError('dateFrom is not midnightUtc')
  state.filters.dateFrom = dateFrom
}

module.exports = {
  filterDateFrom
}
