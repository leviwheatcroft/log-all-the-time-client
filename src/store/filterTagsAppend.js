const check = require('check-types')

function filterTagsAppend (payload, state) {
  const {
    type,
    data: { tag }
  } = payload
  if (type !== 'FILTER_TAGS_APPEND')
    return
  check.assert.containsKey(tag, 'id')
  check.assert.containsKey(tag, 'tagName')
  state.filters.tags.push(tag)
}

module.exports = {
  filterTagsAppend
}
