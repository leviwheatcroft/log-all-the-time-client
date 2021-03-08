const {
  types: {
    isMidnightUtc,
    isDate,
    isNull
  }
} = require('../../lib')

function filterDateFrom (payload, state) {
  const {
    type,
    data: { dateFrom }
  } = payload
  if (type !== 'FILTER_DATE_FROM')
    return

  console.assert(
    isNull(dateFrom) || isDate(dateFrom),
    {
      dateFrom,
      message: 'dateFrom is not null or date'
    }
  )
  console.assert(
    !isDate(dateFrom) || isMidnightUtc(dateFrom),
    {
      dateFrom,
      message: 'dateFrom is not midnightUtc'
    }
  )
  state.filters.dateFrom = dateFrom
}

module.exports = {
  filterDateFrom
}
