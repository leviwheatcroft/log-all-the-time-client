const test = require('ava')

const {
  state,
  reduce
} = require('../../src/store')

test.todo('test with midnightUtc Date')
test('filterDateTo 1', (t) => {
  const dateTo = new Date('01/01/01')
  t.throws(
    () => {
      reduce({ FILTER_DATE_TO: { dateTo } })
    },
    {
      message: 'dateFrom is not midnightUtc'
    }
  )
})
test('filterDateTo 2', (t) => {
  const dateTo = '01/01/01'
  t.throws(
    () => {
      reduce({ FILTER_DATE_TO: { dateTo } })
    },
    {
      message: 'dateFrom is not null or date'
    }
  )
})
