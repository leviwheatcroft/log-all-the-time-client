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
    entryList: {
      fieldsToggle: {
        date: true,
        description: true,
        duration: true,
        tags: true,
        user: true
      }
    },
    durationByDay: {
      loading: true,
      dateFrom: offsetByDays(midnight, -7),
      dateTo: midnight,
      days: []
    }
  }
}

module.exports = {
  getInitialState
}
