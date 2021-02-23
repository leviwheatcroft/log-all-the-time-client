const test = require('ava')

const {
  stringOps: {
    durationAsHHMM
  }
} = require('../../src/lib')

test('durationAsHHMM 1', (t) => {
  const duration = 30
  const HHMM = durationAsHHMM(duration)
  t.is(HHMM, '0:30')
})
test('durationAsHHMM 2', (t) => {
  const duration = 1
  const HHMM = durationAsHHMM(duration)
  t.is(HHMM, '0:01')
})
test('durationAsHHMM 3', (t) => {
  const duration = 90
  const HHMM = durationAsHHMM(duration)
  t.is(HHMM, '1:30')
})
