const { onError } = require('@apollo/link-error')
const { Observable } = require('@apollo/client/core')

const errorHandlers = {
  async AUTH_REFRESH_TIMEOUT () {
    console.log('AUTH_REFRESH_TIMEOUT')
  },
  async AUTH_FAILED () {
    console.log('AUTH_FAILED')
  },
  async UNAUTHORIZED () {
    console.log('UNAUTHORIZED')
  }
}

function getHandler (graphQLErrors = []) {
  const handlerName = graphQLErrors
    .map((e) => {
      if (!e.extensions)
        return null
      return e.extensions.name
    })
    .find((name) => errorHandlers[name])
  return handlerName ? errorHandlers[handlerName] : false
}

function getAuthErrorLink () {
  return onError(({
    graphQLErrors,
    // operation,
    response
  }) => {
    const handler = getHandler(graphQLErrors)
    if (!handler)
      return

    return new Observable(async (observer) => {
      await handler()
      observer.next(response)
    })
  })
}

module.exports = { getAuthErrorLink }
