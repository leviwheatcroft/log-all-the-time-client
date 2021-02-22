const check = require('check-types')

function filterTagsReplace (payload, state) {
  const {
    type,
    data: { tags }
  } = payload
  if (type !== 'FILTER_TAGS_REPLACE')
    return
  check.assert.array.of.containsKey(tags, 'id')
  check.assert.array.of.containsKey(tags, 'tagName')
  state.filters.tags = tags
}

module.exports = {
  filterTagsReplace
}
