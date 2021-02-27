const UserLoginM = require('./UserLoginM.gql')
const EntryUpdateM = require('./EntryUpdateM.gql')
const EntryAddM = require('./EntryAddM.gql')
const UserRefreshM = require('./UserRefreshM.gql')
const EntryUpsertM = require('./EntryUpsertM.gql')
const EntryDeleteM = require('./EntryDeleteM.gql')

module.exports = {
  UserRefreshM,
  UserLoginM,
  EntryUpdateM,
  EntryAddM,
  EntryUpsertM,
  EntryDeleteM
}
