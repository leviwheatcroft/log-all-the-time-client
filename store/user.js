export const state = () => ({
  id: false,
  name: false,
  gravatar: false,
})

export const mutations = {
  logIn (state, user) {
    state.id = user.id
    state.name = user.name
    state.gravatar = user.gravatar
  },
  logOut (state) {
    state.id = false
    state.name = false
  }
}
