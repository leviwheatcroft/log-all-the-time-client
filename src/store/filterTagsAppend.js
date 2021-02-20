function filterTagsAppend (payload, state) {
  const {
    type,
    data: { tagString }
  } = payload
  if (type !== 'FILTER_TAGS_APPEND')
    return
  if (typeof tagString !== 'string')
    throw new RangeError('typeof tagString is not string')
  state.filters.tags.push(tagString)
}

module.exports = {
  filterTagsAppend
}
