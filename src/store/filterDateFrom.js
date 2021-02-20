function filterDateFrom (payload, state) {
  const {
    type,
    data: { dateFrom }
  } = payload
  if (type !== 'FILTER_DATE_FROM')
    return
  if (!(dateFrom instanceof Date))
    throw new RangeError('dateFrom is not instanceof Date')
  state.filters.dateFrom = dateFrom
}

module.exports = {
  filterDateFrom
}
