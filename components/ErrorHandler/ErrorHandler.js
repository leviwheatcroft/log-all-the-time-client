const ErrorHandler = {
  data () {
    return {
      errors: [],
      handlerComponents: {
        NO_CONNECTION: 'error-handler-bad-connection',
        AUTH_INACTIVE_USER: 'error-handler-force-log-out',
        AUTH_FAILED: 'error-handler-force-log-out',
        AUTH_REFRESH_TIMEOUT: 'error-handler-force-log-out'
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

export default ErrorHandler
