const test = require('ava')
const {
  getCursorSegmentCommaSep
} = require('../../src/lib/stringOps/getCursorSegmentCommaSep')

test('getCursorSegment 1', (t) => {
  const testString = 'some comma, separated, string'
  const cursor = 5
  const result = getCursorSegmentCommaSep(testString, cursor)
  t.is(result, 'some comma')
})
test('getCursorSegment 2', (t) => {
  const testString = 'some comma, separated, string'
  const cursor = 13
  const result = getCursorSegmentCommaSep(testString, cursor)
  t.is(result, 'separated')
})
test('getCursorSegment 3', (t) => {
  const testString = 'some comma, separated, string'
  const cursor = 29
  const result = getCursorSegmentCommaSep(testString, cursor)
  t.is(result, 'string')
})
test('getCursorSegment 4', (t) => {
  const testString = 'f'
  const cursor = 1
  const result = getCursorSegmentCommaSep(testString, cursor)
  t.is(result, 'f')
})
test('getCursorSegment 5', (t) => {
  const testString = 'some comma, separated, string'
  const cursor = 10
  const result = getCursorSegmentCommaSep(testString, cursor)
  t.is(result, 'some comma')
})
test('getCursorSegment 6', (t) => {
  const testString = 'some comma, separated, string'
  const cursor = 11
  const result = getCursorSegmentCommaSep(testString, cursor)
  t.is(result, 'separated')
})
