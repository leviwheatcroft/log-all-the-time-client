const check = require('check-types')
const {
  types: {
    isMidnightUtc
  }
} = require('../lib')

function filterDateTo (payload, state) {
  const {
    type,
    data: { dateTo }
  } = payload
  if (type !== 'FILTER_DATE_TO')
    return
  if (!check.date(dateTo))
    throw new RangeError('dateFrom is not instanceof Date')
  if (!isMidnightUtc(dateTo))
    throw new RangeError('dateFrom is not midnightUtc')
  state.filters.dateTo = dateTo
}

module.exports = {
  filterDateTo
}
