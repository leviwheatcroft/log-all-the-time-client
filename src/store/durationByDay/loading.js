const check = require('check-types')

function loading (payload, state) {
  const {
    type,
    data: { loading }
  } = payload
  if (type !== 'DURATIONS_BY_DAY_LOADING')
    return
  if (!check.boolean(loading))
    throw new TypeError('loading is not Boolean')
  state.durationByDay.loading = loading
}

module.exports = {
  loading
}
