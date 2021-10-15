import {
  AuthStatus
} from '../../../lib/enums'
import apollo from '../../../apollo'
import {
  cookies
} from '../../../lib'

const {
  mutations: {
    UserLoginM
  },
  queries: {
    SelfQ
  }
} = apollo

const Login = {
  data () {
    const email = ''
    const name = ''
    const password = ''
    const passwordConfirmation = ''
    return {
      email,
      name,
      password,
      passwordConfirmation
    }
  },
  methods: {
    async clickLogIn () {
      const {
        email,
        password
      } = this
      const loginResult = await this.$apollo.mutate({
        mutation: UserLoginM,
        variables: {
          email,
          password
        }
      })
      cookies.setTokens(loginResult.data.UserLoginM)
      const userResult = await this.$apollo.query({
        query: SelfQ
      })
      const {
        data: { SelfQ: user }
      } = userResult
      this.$store.commit('user/logIn', user)
      this.$store.commit('auth/status', AuthStatus.loggedIn)
    }
  }
}

export default Login
