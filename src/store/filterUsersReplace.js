const {
  types: {
    isUser
  }
} = require('../lib')

function filterUsersReplace (payload, state) {
  const {
    type,
    data: { users }
  } = payload
  if (type !== 'FILTER_USERS_REPLACE')
    return
  if (!users.every(isUser))
    throw new TypeError('user is not user')
  state.filters.users = users
}

module.exports = {
  filterUsersReplace
}
