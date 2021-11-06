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
      passwordValidState: ValidState.unchecked,
      managedErrors: {
        AuthBadEmailError: 'emailValidState',
        AuthBadPasswordError: 'passwordValidState',
        AuthInactiveUserError: 'emailValidState'
      },
      password: ''
    }
  },
  watch: {
    email () {
      this.clearValidState('emailValidState')
      // if (this.emailValidState === ValidState.unchecked)
      //   return
      // this.clearError('AuthBadEmailError')
      // this.clearError('AuthInactiveUserError')
      // this.emailValidState = ValidState.unchecked
    },
    password () {
      this.clearValidState('passwordValidState')
      // if (this.passwordValidState === ValidState.unchecked)
      //   return
      // this.clearError('AuthBadPasswordError')
      // this.passwordValidState = ValidState.unchecked
    },
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
