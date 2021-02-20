function asTagsString (array) {
  if (array.length === 0)
    return ''
  return `${array.join(', ')}, `
}

module.exports = {
  asTagsString
}
