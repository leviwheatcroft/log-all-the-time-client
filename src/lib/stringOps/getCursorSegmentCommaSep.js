const {
  getSegmentBoundariesCommaSep
} = require('./getSegmentBoundariesCommaSep')

function getCursorSegmentCommaSep (string, cursor) {
  const {
    startIdx,
    endIdx
  } = getSegmentBoundariesCommaSep(string, cursor)
  // startIdx and endIdx are 0-based indexes
  // endIdx is the index *before* which to stop
  // '--,--'
  //  01234
  // so if there's a comma at index 2, so you want indexes 0 and 1, you need
  // to string.slice(0, 2)
  const rawSegment = string.slice(startIdx, endIdx)
  const segment = rawSegment.trim()
  return segment
}

module.exports = {
  getCursorSegmentCommaSep
}
