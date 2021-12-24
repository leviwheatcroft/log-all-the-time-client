export const state = () => ({
  id: false,
  name: false,
  gravatar: false,
  dialogs: {},
  options: {}
})

export const mutations = {
  logIn (state, user) {
    state.id = user.id
    state.name = user.name
    state.gravatar = user.gravatar
    state.dialogs = user.dialogs.reduce((_, { key, hidden }) => {
      _[key] = hidden
      return _
    }, {})
    state.options = { ...user.options }
    // eslint-disable-next-line
    console.log(user.dialogs)
    // eslint-disable-next-line
    console.log(user.options)
  },
  updateOptions (state, update) {
    Object.entries(update).forEach(([key, value]) => {
      if (state.options[key] === undefined)
        throw new Error(`updateOptions undefined key: ${key}`)
      state.options[key] = value
    })
  },
  logOut (state) {
    state.id = false
    state.name = false
  }
}
