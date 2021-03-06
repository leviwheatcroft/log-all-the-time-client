const {
  types: {
    isUser
  }
} = require('../lib')

function filterUsersAppend (payload, state) {
  const {
    type,
    data: { user }
  } = payload
  if (type !== 'FILTER_USERS_APPEND')
    return

  if (!isUser(user))
    throw new TypeError('user is not user')
  state.filters.users.push(user)
}

module.exports = {
  filterUsersAppend
}
