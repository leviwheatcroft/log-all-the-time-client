import {
  AuthStatus,
  ValidState
} from '../../../lib/enums'
import apollo from '../../../apollo'
import {
  cookies
} from '../../../lib'
import {
  gqlErrorManager
} from '../../../componentMixins'

const {
  mutations: {
    UserLoginM
  },
  queries: {
    SelfQ
  }
} = apollo

const Login = {
  mixins: [gqlErrorManager],
  data () {
    return {
      email: '',
      emailValidState: ValidState.unchecked,
      managedErrorNames: ['AuthBadEmailError'],
      password: ''
    }
  },
  watch: {
    email () {
      if (this.emailValidState === ValidState.unchecked)
        return
      this.clearError('AuthBadEmailError')
      this.emailValidState = ValidState.unchecked
    }
  },
  methods: {
    async logIn () {
      const {
        email,
        password
      } = this
      let loginResult
      try {
        loginResult = await this.$apollo.mutate({
          mutation: UserLoginM,
          variables: {
            email,
            password
          }
        })
      } catch (err) {
        this.manageErrors(err.graphQLErrors)
        if (this.hasError('AuthBadEmailError'))
          this.emailValidState = ValidState.invalid
        return
      }
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
