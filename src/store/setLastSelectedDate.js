function setLastSelectedDate (payload, state) {
  const {
    type,
    data: { date }
  } = payload
  if (type !== 'SET_LAST_SELECTED_DATE')
    return
  if (!(date instanceof Date))
    throw new RangeError('date is not instanceof Date')
  state.lastSelectedDate = date
}

module.exports = {
  setLastSelectedDate
}
