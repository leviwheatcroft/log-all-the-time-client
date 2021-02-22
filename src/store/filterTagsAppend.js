const {
  assert
} = require('@sindresorhus/is')

function filterTagsAppend (payload, state) {
  const {
    type,
    data: { tag }
  } = payload
  if (type !== 'FILTER_TAGS_APPEND')
    return
  assert.object(tag)
  assert.string(tag.id)
  assert.string(tag.tagName)
  state.filters.tags.push(tag)
}

module.exports = {
  filterTagsAppend
}
