function getInitialState () {
  const midnight = new Date()
  midnight.setHours(0, 0, 0, 0)
  return {
    filters: {
      dateFrom: midnight,
      dateTo: midnight,
      tags: []
    }
  }
}

const state = getInitialState()

const reducers = [
  function updateTagsFilter (payload, state) {
    const {
      action,
      data: {
        dateFrom,
        dateTo,
        tags
      }
    } = payload
    if (action !== 'UPDATE_REPORT_FILTER')
      return

    // Object.entries(data).forEach(([k, v]) => {
    //   state.filters[k] = v
    // })
    state.filters = {
      ...state.filters,
      ...dateFrom ? { dateFrom } : {},
      ...dateTo ? { dateTo } : {},
      ...tags ? { tags } : {}
    }
  }

]

function reduce (payload) {
  reducers.forEach((r) => r(payload, state))
}

module.exports = {
  state,
  reduce
}
