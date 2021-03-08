const { filterDateFrom } = require('./filterDateFrom')
const { filterDateTo } = require('./filterDateTo')
const { filterTagsAppend } = require('./filterTagsAppend')
const { filterTagsReplace } = require('./filterTagsReplace')
const { filterUsersAppend } = require('./filterUsersAppend')
const { filterUsersReplace } = require('./filterUsersReplace')

module.exports = [
  filterDateFrom,
  filterDateTo,
  filterTagsAppend,
  filterTagsReplace,
  filterUsersAppend,
  filterUsersReplace
]
