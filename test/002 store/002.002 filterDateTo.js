const test = require('ava')

const {
  state,
  reduce
} = require('../../src/store')

test('filterDateTo 1', (t) => {
  const dateTo = new Date('01/01/01')
  reduce({ FILTER_DATE_TO: { dateTo } })
  t.is(state.filters.dateTo, dateTo)
})
test('filterDateTo 2', (t) => {
  const dateTo = '01/01/01'
  t.throws(
    () => {
      reduce({ FILTER_DATE_TO: { dateTo } })
    },
    {
      instanceOf: RangeError
    }
  )
})
