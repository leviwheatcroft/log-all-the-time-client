import {
  AuthStatus
} from '../../../lib/enums'
import apollo from '../../../apollo'
import {
  cookies
} from '../../../lib'

const {
  mutations: {
    UserRegisterM
  },
  queries: {
    SelfQ
  }
} = apollo

const Register = {
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
    async clickRegister () {
      const {
        email,
        username,
        password,
        passwordConfirmation
      } = this
      if (password !== passwordConfirmation)
        throw new Error('bad conf')
      const registerResult = await this.$apollo.mutate({
        mutation: UserRegisterM,
        variables: {
          email,
          username,
          password
        }
      })
      cookies.setTokens(registerResult.data.UserRegisterM)
      const userResult = await this.$apollo.query({
        query: SelfQ
      })
      const {
        data: { SelfQ: user }
      } = userResult
      this.$store.commit('user/logIn', { user })
      this.$store.commit('auth/status', AuthStatus.loggedIn)
    }
  }
}

export default Register
