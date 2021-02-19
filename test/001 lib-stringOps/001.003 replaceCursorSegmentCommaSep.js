const test = require('ava')
const {
  replaceCursorSegmentCommaSep
} = require('../../src/lib/stringOps/replaceCursorSegmentCommaSep')

test('replaceCursorSegmentCommaSep 1', (t) => {
  const testString = 'one, two, three'
  const cursor = 2
  const replacement = 'replacement'
  const result = replaceCursorSegmentCommaSep(testString, cursor, replacement)
  t.is(result, 'replacement, two, three')
})
test('replaceCursorSegmentCommaSep 2', (t) => {
  const testString = 'one, two, three'
  const cursor = 6
  const replacement = 'replacement'
  const result = replaceCursorSegmentCommaSep(testString, cursor, replacement)
  t.is(result, 'one, replacement, three')
})
test('replaceCursorSegmentCommaSep 3', (t) => {
  const testString = 'one, two, three'
  const cursor = 13
  const replacement = 'replacement'
  const result = replaceCursorSegmentCommaSep(testString, cursor, replacement)
  t.is(result, 'one, two, replacement')
})
test('replaceCursorSegmentCommaSep 4', (t) => {
  const testString = 'one, two, three'
  const cursor = 0
  const replacement = 'replacement'
  const result = replaceCursorSegmentCommaSep(testString, cursor, replacement)
  t.is(result, 'replacement, two, three')
})
test('replaceCursorSegmentCommaSep 5', (t) => {
  const testString = 'one,two,three'
  const cursor = 6
  const replacement = 'replacement'
  const result = replaceCursorSegmentCommaSep(testString, cursor, replacement)
  t.is(result, 'one,replacement,three')
})
test('replaceCursorSegmentCommaSep 6', (t) => {
  const testString = 'one, two, three'
  const cursor = 15
  const replacement = 'replacement'
  const result = replaceCursorSegmentCommaSep(testString, cursor, replacement)
  t.is(result, 'one, two, replacement')
})
test('replaceCursorSegmentCommaSep 7', (t) => {
  const testString = 'one'
  const cursor = 1
  const replacement = 'two'
  const result = replaceCursorSegmentCommaSep(testString, cursor, replacement)
  t.is(result, 'two')
})
test('replaceCursorSegmentCommaSep 8', (t) => {
  const testString = ',,,,'
  const cursor = 2
  const replacement = 'replacement'
  const result = replaceCursorSegmentCommaSep(testString, cursor, replacement)
  t.is(result, ',,replacement,,')
})
