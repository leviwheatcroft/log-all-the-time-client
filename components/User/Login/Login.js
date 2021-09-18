import {
  AuthState
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
    const username = ''
    const password = ''
    const passwordConfirmation = ''
    return {
      email,
      username,
      password,
      passwordConfirmation
    }
  },
  methods: {
    async clickSubmit () {
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
      cookies.setTokens(loginResult.data)
      const userResult = await this.$apollo.query({
        query: SelfQ
      })
      const {
        data: { SelfQ: user }
      } = userResult
      this.$store.commit('user', user)
      this.$store.commit('authState', AuthState.loggedIn)
    }
  }
}

export default Login