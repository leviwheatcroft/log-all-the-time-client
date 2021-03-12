const { onError } = require('@apollo/client/link/error')

// const { reduce } = require('../../store')

const errorHandlers = {
  // it would be nice to use vue router for the redirects here, but getting a
  // reference to vue-router here would be complex, and these arrors won't
  // occur during normal operation anyway, so `window.location.href` is an
  // easy work around.
  AUTH_INACTIVE_USER (err) {
    const detail = { err }
    const customEvent = new CustomEvent('AUTH_INACTIVE_USER', { detail })
    document.dispatchEvent(customEvent)
    // console.error(err.message)
    // reduce({ USER_LOG_OUT: {} })
    // window.location.href = '/#/login'
  },
  NO_CONNECTION (err) {
    const detail = { err }
    const customEvent = new CustomEvent('NO_CONNECTION', { detail })
    document.dispatchEvent(customEvent)
  }
  // async AUTH_REFRESH_TIMEOUT () {
  //   console.log('AUTH_REFRESH_TIMEOUT')
  // },
  // async AUTH_FAILED () {
  //   console.log('AUTH_FAILED')
  // },
  // async UNAUTHORIZED () {
  //   console.log('UNAUTHORIZED')
  // }
}

function getAuthErrorLink (ctx) {
  return onError((onErrorContext) => {
    const {
      graphQLErrors,
      networkError
    } = onErrorContext
    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        if (errorHandlers[err.code])
          errorHandlers[err.code](err, ctx)
        else
          console.error('unhandled graphQLError:', err)
      })
    }
    // I can't find a way to squelch network errors. They will always appear
    // in the console. Maybe that's not such a bad thing anyway.
    if (networkError) {
      if (networkError.message === 'Failed to fetch') {
        errorHandlers.NO_CONNECTION(networkError)
        onErrorContext.networkError = null
      } else {
        console.error('unhandled networkError:', networkError)
      }
    }
  })
}

module.exports = { getAuthErrorLink }
