const { NokoEntry } = require('./NokoEntry')

const typePolicies = {
  NokoEntry,
  Query: {
    fields: {
      // EntryFilterQ
    }
  }
}

module.exports = {
  typePolicies
}
