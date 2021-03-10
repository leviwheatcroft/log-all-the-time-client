const { onError } = require('@apollo/link-error')

const { reduce } = require('../../store')

const errorHandlers = {
  // it would be nice to use vue router for the redirects here, but getting a
  // reference to vue-router here would be complex, and these arrors won't
  // occur during normal operation anyway, so `window.location.href` is an
  // easy work around.
  AUTH_INACTIVE_USER (err) {
    console.error(err.message)
    reduce({ USER_LOG_OUT: {} })
    window.location.href = '/#/login'
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
  return onError(({
    graphQLErrors
  }) => {
    graphQLErrors.forEach((err) => {
      if (errorHandlers[err.code])
        errorHandlers[err.code](err, ctx)
      else
        console.error('unhandled error:', err)
    })
  })
}

module.exports = { getAuthErrorLink }
