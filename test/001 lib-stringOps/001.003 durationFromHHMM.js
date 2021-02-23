const test = require('ava')

const {
  stringOps: {
    durationFromHHMM
  }
} = require('../../src/lib')

test('durationFromHHMM 1', (t) => {
  const HHMM = '0:30'
  const duration = durationFromHHMM(HHMM)
  t.is(duration, 30)
})
test('durationFromHHMM 2', (t) => {
  const HHMM = '0:01'
  const duration = durationFromHHMM(HHMM)
  t.is(duration, 1)
})
test('durationFromHHMM 3', (t) => {
  const HHMM = '1:30'
  const duration = durationFromHHMM(HHMM)
  t.is(duration, 90)
})
