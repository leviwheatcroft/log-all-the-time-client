export const state = () => ({
  username: false
})

export const mutations = {
  logIn (state, username) {
    state.username = username
  },
  logOut (state) {
    state.username = false
  }
}
