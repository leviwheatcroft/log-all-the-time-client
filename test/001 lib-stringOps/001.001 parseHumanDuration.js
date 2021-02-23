const test = require('ava')

const {
  stringOps: {
    parseHumanDuration
  }
} = require('../../src/lib')

test('parseHumanDuration 1', (t) => {
  const humanDurationString = '30m'
  const duration = parseHumanDuration(humanDurationString)
  t.is(duration, 30)
})
test('parseHumanDuration 2', (t) => {
  const humanDurationString = '2h'
  const duration = parseHumanDuration(humanDurationString)
  t.is(duration, 120)
})
test('parseHumanDuration 3', (t) => {
  const humanDurationString = '2.25h'
  const duration = parseHumanDuration(humanDurationString)
  t.is(duration, 135)
})
test('parseHumanDuration 4', (t) => {
  const humanDurationString = '2.25'
  const duration = parseHumanDuration(humanDurationString)
  t.is(duration, 135)
})
test('parseHumanDuration 5', (t) => {
  const humanDurationString = '01:00'
  const duration = parseHumanDuration(humanDurationString)
  t.is(duration, 60)
})
