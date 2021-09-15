export const state = () => ({
  id: false,
  username: false
})

export const mutations = {
  logIn (state, user) {
    state.id = user.id
    state.username = user.username
  },
  logOut (state) {
    state.id = false
    state.username = false
  }
}
