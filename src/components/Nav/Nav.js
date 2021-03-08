const { state } = require('../../store')
const {
  IconLoader
} = require('../../icons')

const Nav = {
  data () {
    const {
      auth
    } = state
    return {
      auth
    }
  },
  components: {
    IconLoader
  },
  computed: {
    loggedIn () {
      return this.auth.loggedIn
    },
    username () {
      return this.auth.user.username
    }
  }
}

module.exports = Nav
