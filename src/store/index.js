const durationByDay = require('./durationByDay')
const entryList = require('./entryList')
const { filterDateFrom } = require('./filterDateFrom')
const { filterDateTo } = require('./filterDateTo')
const { filterTagsAppend } = require('./filterTagsAppend')
const { filterTagsReplace } = require('./filterTagsReplace')
const { filterUsersAppend } = require('./filterUsersAppend')
const { filterUsersReplace } = require('./filterUsersReplace')
const { setLastSelectedDate } = require('./setLastSelectedDate')
const { getInitialState } = require('./getInitialState')

const state = getInitialState()

const reducers = [
  ...durationByDay,
  ...entryList,
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
