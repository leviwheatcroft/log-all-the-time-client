function isItem (_item) {
  const {
    id,
    itemName
  } = _item
  return (
    (
      typeof id === 'number' ||
      id === false
    ) &&
    typeof itemName === 'string'
  )
}

module.exports = {
  isItem
}
