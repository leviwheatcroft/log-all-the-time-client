const EntryQ = require('./EntryQ.gql')
const EntryFilterQ = require('./EntryFilterQ')
const EntryFilterAsCsvQ = require('./EntryFilterAsCsvQ')
const TagPartialQ = require('./TagPartialQ')
const DurationByDayQ = require('./DurationByDayQ')
const UserPartialQ = require('./UserPartialQ')
const SelfQ = require('./SelfQ')

module.exports = {
  SelfQ,
  EntryQ,
  EntryFilterQ,
  EntryFilterAsCsvQ,
  TagPartialQ,
  DurationByDayQ,
  UserPartialQ
}
