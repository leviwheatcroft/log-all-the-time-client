import {
  enums,
  cookies
} from '../../lib'
import apollo from '../../apollo'

const {
  AuthStatus
} = enums
const {
  mutations: {
    UserRefreshM
  },
  queries: {
    SelfQ
  }
} = apollo

const AuthManager = {
  data () {
    return {
      AuthStatus
    }
  },
  computed: {
    authStatus () {
      return this.$store.state.auth.status
    }
  },
  watch: {
    authStatus (authStatus, prev) {
      // not sure whether this is necessary
      if (authStatus === prev)
        return

      // eslint-disable-next-line default-case
      switch (authStatus) {
        case AuthStatus.initialising:
          return
        case AuthStatus.loggedIn:
          if (
            this.$router.currentRoute.name === 'login' ||
            this.$router.currentRoute.name === 'register' ||
            this.$router.currentRoute.name === 'verify'
          )
            this.$router.push({ name: 'index' })
          return
        case AuthStatus.loggedOut:
          if (
            this.$router.currentRoute.name !== 'login' &&
            this.$router.currentRoute.name !== 'register'
          )
            this.$router.push({ name: 'login' })
          return
        case AuthStatus.emailPendingVerification:
          if (this.$router.currentRoute.name !== 'verify')
            this.$router.push({ name: 'verify' })
          return
        case AuthStatus.emailFailedVerification:
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
        this.$store.commit('auth/status', AuthStatus.loggedOut)
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

      this.$store.commit('user/logIn', user.username)
      this.$store.commit('auth/status', AuthStatus.loggedIn)
    })
  }
}

export default AuthManager
