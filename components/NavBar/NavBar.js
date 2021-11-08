import {
  AuthStatus
} from '../../lib/enums'
import config from '../../config'
const {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME
} = config

const NavBar = {
  data () {
    return {
      showUserMenu: false
    }
  },
  computed: {
    name () {
      return this.$store.state.user.name
    },
    gravatar () {
      return this.$store.state.user.gravatar
    }
  },
  methods: {
    clickLogOut () {
      localStorage.removeItem(ACCESS_TOKEN_COOKIE_NAME)
      localStorage.removeItem(REFRESH_TOKEN_COOKIE_NAME)
      this.$store.commit('auth/status', AuthStatus.loggedOut)
      this.$store.commit('user/logOut')
      this.$router.push({ name: 'login' })
    }
  }
}

export default NavBar
