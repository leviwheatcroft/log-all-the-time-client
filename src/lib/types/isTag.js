const check = require('check-types')

function isTag (tag) {
  const {
    id,
    tagName
  } = tag
  return (
    check.string(id),
    check.string(tagName)
  )
}

module.exports = {
  isTag
}
