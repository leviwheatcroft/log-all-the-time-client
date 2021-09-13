const {
  isItem
} = require('./isItem')

function isItems (_items) {
  return _items.every(isItem)
}

module.exports = {
  isItems
}
