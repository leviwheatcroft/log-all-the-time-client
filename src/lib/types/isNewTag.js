const check = require('check-types')

function isNewTag (tag) {
  const {
    id,
    tagName
  } = tag
  return (
    check.undefined(id) &&
    check.string(tagName)
  )
}

module.exports = {
  isNewTag
}
