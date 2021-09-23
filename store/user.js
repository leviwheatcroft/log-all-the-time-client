export const state = () => ({
  id: false,
  username: false,
  gravatar: false,
})

export const mutations = {
  logIn (state, user) {
    state.id = user.id
    state.username = user.username
    state.gravatar = user.gravatar
  },
  logOut (state) {
    state.id = false
    state.username = false
  }
}
