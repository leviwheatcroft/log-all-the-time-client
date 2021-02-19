const { getCommaIndexes } = require('./getCommaIndexes')

function getSegmentBoundariesCommaSep (string, cursor) {
  const commas = getCommaIndexes(string)
  if (commas.length === 0)
    return { startIdx: 0, endIdx: string.length }
  commas.unshift(-1)
  commas.push(string.length)
  const reference = commas.findIndex((i) => i >= cursor)
  if (reference === -1)
    throw Error()
  const endIdx = commas[reference]
  const startIdx = commas[reference - 1] + 1
  return {
    startIdx,
    endIdx
  }
}

module.exports = {
  getSegmentBoundariesCommaSep
}
