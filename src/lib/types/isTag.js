function isTag (tag) {
  const {
    id,
    tagName
  } = tag
  return (
    typeof id === 'string' &&
    typeof tagName === 'string'
  )
}

module.exports = {
  isTag
}
