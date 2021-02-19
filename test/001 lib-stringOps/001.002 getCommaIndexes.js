const test = require('ava')
const {
  getCommaIndexes
} = require('../../src/lib/stringOps/getCommaIndexes')

test('getCommaIndexes 1', (t) => {
  const testString = ' , , , ,'
  const result = getCommaIndexes(testString)
  t.deepEqual(result, [1, 3, 5, 7])
})
