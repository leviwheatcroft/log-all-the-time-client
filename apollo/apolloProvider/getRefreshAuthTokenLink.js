const { onError } = require('@apollo/client/link/error')
const { Observable } = require('@apollo/client/core')

const { UserRefreshM } = require('../mutations')
const { cookies } = require('../../lib')

const refreshHandlers = {
  async AuthAccessTimeoutError (ctx) {
    const {
      getClient
    } = ctx
    const client = getClient()
    const refreshToken = cookies.getRefreshToken()
    const result = await client.mutate({
      mutation: UserRefreshM,
      variables: {
        refreshToken
      }
    })
    const {
      data: {
        UserRefreshM: accessToken
      }
    } = result

    cookies.setAccessToken(accessToken)
    return result
  }
}

function getHandler (graphQLErrors = []) {
  const handlerName = graphQLErrors
    .map(({ name }) => name)
    .find((name) => refreshHandlers[name])
  return handlerName ? refreshHandlers[handlerName] : false
}

let waitingForRefresh = false
let lastRefresh = Promise.resolve()

function getRefreshAuthTokenLink (ctx) {
  return onError((context) => {
    const {
      graphQLErrors,
      // networkError,
      operation,
      response,
      forward
    } = context

    const handler = getHandler(graphQLErrors)
    if (!handler)
      return

    return new Observable((observer) => {
      if (!waitingForRefresh) {
        waitingForRefresh = true
        lastRefresh = handler(ctx)
          .then(({ errors }) => {
            // because errorPolicy: 'all' refreshHandler ought not throw,
            // but return errors in the error property instead.
            // the only error present here should be AUTH_REFRESH_TIMEOUT
            // pass that back to the waiting requests so they can return that
            // instead of AUTH_ACCESS_TIMEOUT
            waitingForRefresh = false
            return { errors }
          })
      }
      lastRefresh.then(({ errors }) => {
        if (errors) {
          // error refreshing token, replace original error with refresh
          // token error, and allow that request to complete normally,
          // passing the refresh error back to the ui
          response.errors = errors
          return observer.next(response)
        }
        // successfully obtained new token, so update the auth header and
        // resend the original query
        const { headers } = operation.getContext()
        const authorization = {
          Authorization: cookies.getAccessToken()
        }
        operation.setContext({ headers: { ...headers, ...authorization } })
        forward(operation).subscribe(observer)
      })
    })
  })
}

module.exports = { getRefreshAuthTokenLink }
