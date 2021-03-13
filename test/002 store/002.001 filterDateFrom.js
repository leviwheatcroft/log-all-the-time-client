const test = require('ava')

const {
  state,
  reduce
} = require('../../src/store')

test.todo('test with midnightUtc Date')
test('filterDateFrom 1', (t) => {
  const dateFrom = new Date('01/01/01')
  t.throws(
    () => {
      reduce({ FILTER_DATE_FROM: { dateFrom } })
    },
    {
      message: 'dateFrom is not midnightUtc'
    }
  )
})
test('filterDateFrom 2', (t) => {
  const dateFrom = '01/01/01'
  t.throws(
    () => {
      reduce({ FILTER_DATE_FROM: { dateFrom } })
    },
    {
      message: 'dateFrom is not null or date'
    }
  )
})
