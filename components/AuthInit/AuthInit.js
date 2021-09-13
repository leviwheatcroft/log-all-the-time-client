import {
  AuthState
} from '../../enums'
import apollo from '../../apollo'
import {
  cookies
} from '../../lib'

const {
  mutations: {
    UserRefreshM
  },
  queries: {
    SelfQ
  }
} = apollo

const AuthInit = {
  data () {
    return {
      AuthState
    }
  },
  computed: {
    authState () {
      return this.$store.state.authState
    }
  },
  watch: {
    authState (authState, prev) {
      // not sure whether this is necessary
      if (authState === prev)
        return

      // eslint-disable-next-line default-case
      switch (authState) {
        case AuthState.initialising:
          return
        case AuthState.loggedIn:
          if (
            this.$router.currentRoute.name === 'login' ||
            this.$router.currentRoute.name === 'register' ||
            this.$router.currentRoute.name === 'verify'
          )
            this.$router.push({ name: 'index' })
          return
        case AuthState.loggedOut:
          if (
            this.$router.currentRoute.name !== 'login' &&
            this.$router.currentRoute.name !== 'register'
          )
            this.$router.push({ name: 'login' })
          return
        case AuthState.emailPendingVerification:
          if (this.$router.currentRoute.name !== 'verify')
            this.$router.push({ name: 'verify' })
          return
        case AuthState.emailFailedVerification:
          if (this.$router.currentRoute.name !== 'badEmail')
            this.$router.push({ name: 'badEmail' })
          return
        default:
          throw new Error('bad auth state')
      }
    }
  },
  mounted () {
    this.$nextTick(async function () {
      const refreshToken = cookies.getRefreshToken()
      if (!refreshToken) {
        this.$store.commit('authState', AuthState.loggedOut)
        return
      }
      const refreshResult = await this.$apollo.mutate({
        mutation: UserRefreshM,
        variables: {
          refreshToken
        }
      })
      cookies.setTokens(refreshResult.data)
      const userResult = await this.$apollo.query({
        query: SelfQ
      })
      const {
        data: { SelfQ: user }
      } = userResult
      this.$store.commit('user', { user })
      this.$store.commit('authState', AuthState.loggedIn)
    })
  }
}

export default AuthInit
