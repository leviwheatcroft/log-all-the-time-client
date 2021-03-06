const durationByDay = require('./durationByDay')
const { filterDateFrom } = require('./filterDateFrom')
const { filterDateTo } = require('./filterDateTo')
const { filterTagsAppend } = require('./filterTagsAppend')
const { filterTagsReplace } = require('./filterTagsReplace')
const { filterUsersAppend } = require('./filterUsersAppend')
const { filterUsersReplace } = require('./filterUsersReplace')
const { setLastSelectedDate } = require('./setLastSelectedDate')
const {
  dates: {
    midnightUtc,
    offsetByDays
  }
} = require('../lib')

function getInitialState () {
  const midnight = midnightUtc(new Date())
  return {
    lastSelectedDate: new Date(),
    filters: {
      dateFrom: midnight,
      dateTo: midnight,
      tags: [],
      users: []
    },
    durationByDay: {
      loading: true,
      dateFrom: offsetByDays(midnight, -7),
      dateTo: midnight,
      days: []
    }
  }
}

const state = getInitialState()

const reducers = [
  ...durationByDay,
  filterDateFrom,
  filterDateTo,
  filterTagsAppend,
  filterTagsReplace,
  filterUsersAppend,
  filterUsersReplace,
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
