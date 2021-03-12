const {
  IconLogOut
} = require('../../../icons')
const {
  reduce
} = require('../../../store')

const ErrorForceLogOut = {
  components: {
    IconLogOut
  },
  mounted () {
    // this runs when the error occurs
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    reduce({
      USER_LOG_OUT: {}
    })
  },
  methods: {
    clickOk () {
      // emitting resolved removes the error from the ui
      this.$emit('resolved')
      this.$router.push({ name: 'login' })
    }
  }
}

module.exports = ErrorForceLogOut
