const is = require('@sindresorhus/is')

const { assert } = is

function filterTagsReplace (payload, state) {
  const {
    type,
    data: { tags }
  } = payload
  if (type !== 'FILTER_TAGS_REPLACE')
    return
  assert.array(tags, (t) => is.string(t.id) && is.string(t.tagName))
  state.filters.tags = tags
}

module.exports = {
  filterTagsReplace
}
