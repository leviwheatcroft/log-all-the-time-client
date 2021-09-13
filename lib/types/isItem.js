function isItem (_item) {
  const {
    id,
    itemName
  } = _item
  return (
    (
      typeof id === 'string' ||
      id === false
    ) &&
    typeof itemName === 'string'
  )
}

module.exports = {
  isItem
}
