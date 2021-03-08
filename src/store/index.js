const durationByDay = require('./durationByDay')
const entryList = require('./entryList')
const filter = require('./filter')
const { setLastSelectedDate } = require('./setLastSelectedDate')
const { getInitialState } = require('./getInitialState')

const state = getInitialState()

const reducers = [
  ...durationByDay,
  ...entryList,
  ...filter,
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
