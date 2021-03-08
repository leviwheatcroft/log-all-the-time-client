const {
  types: {
    isTag
  }
} = require('../../lib')

function filterTagsReplace (payload, state) {
  const {
    type,
    data: { tags }
  } = payload
  if (type !== 'FILTER_TAGS_REPLACE')
    return
  if (!tags.every(isTag))
    throw new TypeError('tag is not tag')
  state.filters.tags = tags
}

module.exports = {
  filterTagsReplace
}
