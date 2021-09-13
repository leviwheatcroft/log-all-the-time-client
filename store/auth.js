import { AuthStatus } from '../lib/enums'

export const state = () => ({
  status: AuthStatus.initialising
})

export const mutations = {
  status (state, authStatus) {
    state.status = authStatus
  }
}
