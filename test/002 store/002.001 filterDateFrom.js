const test = require('ava')

const {
  state,
  reduce
} = require('../../src/store')

test('filterDateFrom 1', (t) => {
  const dateFrom = new Date('01/01/01')
  reduce({ FILTER_DATE_FROM: { dateFrom } })
  t.is(state.filters.dateFrom, dateFrom)
})
test('filterDateFrom 2', (t) => {
  const dateFrom = '01/01/01'
  t.throws(
    () => {
      reduce({ FILTER_DATE_FROM: { dateFrom } })
    },
    {
      instanceOf: RangeError
    }
  )
})
