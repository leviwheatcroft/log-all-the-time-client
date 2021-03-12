const {
  from,
  ApolloClient,
  InMemoryCache,
  HttpLink
} = require('@apollo/client/core')
const { default: VueApollo } = require('vue-apollo')
const { APOLLO_URI } = require('../../../config')
const { getAuthHeaderLink } = require('./getAuthHeaderLink')
const { getAuthErrorLink } = require('./getAuthErrorLink')
const { getRefreshAuthTokenLink } = require('./getRefreshAuthTokenLink')

const httpLink = new HttpLink({ uri: APOLLO_URI })

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        EntryFilterQ: {
          keyArgs: [
            'dateFrom',
            'dateTo',
            'tags',
            'users'
          ],
          merge (existing, incoming) {
            const docs = [
              ...existing ? existing.docs : [],
              ...incoming.docs
            ]
            return {
              ...incoming,
              docs
            }
          }
        }
      }
    }
  }
})

const apolloClient = new ApolloClient({
  // link: httpLink,
  link: from([
    // order is important
    getAuthHeaderLink({ getClient }),
    getAuthErrorLink({ getClient }),
    getRefreshAuthTokenLink({ getClient }),
    httpLink
  ]),
  cache
})

function getClient () {
  return apolloClient
}

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
  // defaultOptions: {
  //   query: {
  //     errorPolicy: 'all'
  //   },
  //   mutate: {
  //     errorPolicy: 'all'
  //   }
  // }
})

module.exports = {
  apolloProvider
}
