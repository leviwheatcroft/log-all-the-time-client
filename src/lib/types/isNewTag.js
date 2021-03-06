const check = require('check-types')

function isNewTag (_newTag) {
  const {
    id,
    tagName
  } = _newTag
  return (
    id === false &&
    check.string(tagName)
  )
}

module.exports = {
  isNewTag
}
