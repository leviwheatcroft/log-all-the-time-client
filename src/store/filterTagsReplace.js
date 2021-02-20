function filterTagsReplace (payload, state) {
  const {
    type,
    data: { tagsString }
  } = payload
  if (type !== 'FILTER_TAGS_REPLACE')
    return
  if (typeof tagsString !== 'string')
    throw new RangeError('typeof tagsString is not string')
  const tags = tagsString
    .trim()
    .replace(/,$/, '')
    .split(/,/)
    .map((s) => s.trim())
    .filter((s) => s)
  state.filters.tags = tags
}

module.exports = {
  filterTagsReplace
}
