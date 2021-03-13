const { default: ErrorBadConnection } = require('./ErrorBadConnection')
const { default: ErrorForceLogOut } = require('./ErrorForceLogOut')

const ErrorHandler = {
  data () {
    return {
      errors: [],
      handlerComponents: {
        NO_CONNECTION: ErrorBadConnection,
        AUTH_INACTIVE_USER: ErrorForceLogOut,
        AUTH_FAILED: ErrorForceLogOut,
      }
    }
  },
  mounted () {
    Object.keys(this.handlerComponents).forEach((type) => {
      document.addEventListener(type, (error) => {
        if (this.errors.find((e) => e.name === error.name))
          return
        this.errors.push(error)
      })
    })
  }
}

module.exports = ErrorHandler
