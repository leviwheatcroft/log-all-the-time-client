const { filterDateFrom } = require('./filterDateFrom')
const { filterDateTo } = require('./filterDateTo')
const { filterTagsAppend } = require('./filterTagsAppend')
const { filterTagsReplace } = require('./filterTagsReplace')
const { setLastSelectedDate } = require('./setLastSelectedDate')
const { midnightUtc } = require('../lib')

function getInitialState () {
  const midnight = midnightUtc(new Date())
  return {
    lastSelectedDate: new Date(),
    filters: {
      dateFrom: midnight,
      dateTo: midnight,
      tags: []
    }
  }
}

const state = getInitialState()

const reducers = [
  filterDateFrom,
  filterDateTo,
  filterTagsAppend,
  filterTagsReplace,
  setLastSelectedDate
]

function reduce (actions) {
  Object.entries(actions).forEach(([type, data]) => {
    reducers.forEach((r) => r({ type, data }, state))
  })
}

module.exports = {
  state,
  reduce
}
