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
    async register () {
      const {
        email,
        name,
        password,
        passwordConfirmation
      } = this
      if (password !== passwordConfirmation)
        throw new Error('bad conf')
      const registerResult = await this.$apollo.mutate({
        mutation: UserRegisterM,
        variables: {
          email,
          name,
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
      this.$store.commit('user/logIn', user)
      this.$store.commit('auth/status', AuthStatus.loggedIn)
    }
  }
}

export default Register
