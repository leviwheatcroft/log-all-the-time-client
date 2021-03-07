function isItem (_item) {
  const {
    id,
    itemName
  } = _item
  return (
    typeof id === 'string' &&
    typeof itemName === 'string'
  )
}

module.exports = {
  isItem
}
