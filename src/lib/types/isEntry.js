const check = require('check-types')

function isEntry (entry) {
  const {
    id,
    date,
    // duration,
    // description,
    tags
  } = entry
  // if (!check.string(id))
  //   throw new TypeError('entry id is not string')
  // if (!check.date(date))
  //   throw new TypeError('entry date is not date')
  // if (!check.array(tags))
  //   throw new TypeError('entry tags is not array')
  return (
    check.string(id) &&
    check.date(date) &&
    check.array(tags)
  )
}

module.exports = {
  isEntry
}
