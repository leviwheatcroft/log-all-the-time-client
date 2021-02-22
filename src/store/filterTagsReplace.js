const {
  assert,
  is
} = require('@sindresorhus/is')

function filterTagsReplace (payload, state) {
  const {
    type,
    data: { tags }
  } = payload
  if (type !== 'FILTER_TAGS_REPLACE')
    return
  assert.array(tags, (t) => is.string(t.id) && is.string(t.tagName))
  if (typeof tagsString !== 'string')
    throw new RangeError('typeof tagsString is not string')
  state.filters.tags = tags
}

module.exports = {
  filterTagsReplace
}
