const {
  types: {
    isTag
  }
} = require('../../lib')

function filterTagsAppend (payload, state) {
  const {
    type,
    data: { tag }
  } = payload
  if (type !== 'FILTER_TAGS_APPEND')
    return

  if (!isTag(tag))
    throw new TypeError('tag is not tag')
  state.filters.tags.push(tag)
}

module.exports = {
  filterTagsAppend
}
