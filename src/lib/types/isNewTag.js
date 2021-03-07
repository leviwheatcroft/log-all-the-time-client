function isNewTag (_newTag) {
  const {
    id,
    tagName
  } = _newTag
  return (
    id === false &&
    typeof tagName === 'string'
  )
}

module.exports = {
  isNewTag
}
