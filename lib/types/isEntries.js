const {
  isEntry
} = require('./isEntry')

function isEntries (_entries) {
  return _entries.every(isEntry)
}

module.exports = {
  isEntries
}
