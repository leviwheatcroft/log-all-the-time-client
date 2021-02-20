function filterDateTo (payload, state) {
  const {
    type,
    data: { dateTo }
  } = payload
  if (type !== 'FILTER_DATE_TO')
    return
  if (!(dateTo instanceof Date))
    throw new RangeError('dateTo is not instanceof Date')
  state.filters.dateTo = dateTo
}

module.exports = {
  filterDateTo
}
