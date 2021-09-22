import {
  AuthStatus
} from '../../../lib/enums'
import config from '../../../config'

// TODO this can be changed to import once other consumers of config are
// changed to es6 imports
const {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME
} = config

const ErrorForceLogOut = {
  mounted () {
    // this runs when the error occurs
    localStorage.removeItem(ACCESS_TOKEN_COOKIE_NAME)
    localStorage.removeItem(REFRESH_TOKEN_COOKIE_NAME)
    this.$store.commit('auth/status', AuthStatus.loggedOut)
    this.$store.commit('user/logOut')
  },
  methods: {
    clickOk () {
      // emitting resolved removes the error from the ui
      this.$emit('resolved')
      this.$router.push({ name: 'login' })
    }
  }
}

export default ErrorForceLogOut
