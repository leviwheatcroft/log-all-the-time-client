import { AuthState } from '../enums'

export const state = () => ({
  authState: AuthState.initialising
})

export const mutations = {
  authState (state, authState) {
    state.authState = authState
  }
}
