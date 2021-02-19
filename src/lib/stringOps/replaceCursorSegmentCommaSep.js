const {
  getSegmentBoundariesCommaSep
} = require('./getSegmentBoundariesCommaSep')

function replaceCursorSegmentCommaSep (string, cursor, replacement) {
  const {
    startIdx,
    endIdx
  } = getSegmentBoundariesCommaSep(string, cursor)
  const originalSegment = string.slice(startIdx, endIdx)
  const prefixRegExp = /^( *?)[^ ]/
  const prefixMatch = prefixRegExp.exec(originalSegment)
  const prefix = prefixMatch ? prefixMatch[1] : ''
  const suffixRegExp = /[^ ]( *?)$/
  const suffixMatch = suffixRegExp.exec(originalSegment)
  const suffix = suffixMatch ? suffixMatch[1] : ''

  const replaced = [
    string.slice(0, startIdx),
    prefix,
    replacement,
    suffix,
    string.slice(endIdx)
  ].join('')

  return replaced
}

module.exports = {
  replaceCursorSegmentCommaSep
}
