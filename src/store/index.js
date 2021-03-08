const durationByDay = require('./durationByDay')
const entryList = require('./entryList')
const filter = require('./filter')
const auth = require('./auth')
const { setLastSelectedDate } = require('./setLastSelectedDate')
const { getInitialState } = require('./getInitialState')

const state = getInitialState()

const reducers = [
  ...durationByDay,
  ...entryList,
  ...filter,
  ...auth,
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
