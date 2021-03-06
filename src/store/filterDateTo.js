const {
  types: {
    isMidnightUtc,
    isDate,
    isNull
  }
} = require('../lib')

function filterDateTo (payload, state) {
  const {
    type,
    data: { dateTo }
  } = payload
  if (type !== 'FILTER_DATE_TO')
    return
  console.assert(
    isNull(dateTo) || isDate(dateTo),
    {
      dateTo,
      message: 'dateFrom is not null or date'
    }
  )
  console.assert(
    !isDate(dateTo) || isMidnightUtc(dateTo),
    {
      dateTo,
      message: 'dateFrom is not midnightUtc'
    }
  )
  state.filters.dateTo = dateTo
}

module.exports = {
  filterDateTo
}
