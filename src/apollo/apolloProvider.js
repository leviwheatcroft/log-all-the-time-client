const { ApolloClient } = require('apollo-client')
const { createHttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { default: VueApollo } = require('vue-apollo')
const { APOLLO_URI } = require('../../config')

const link = createHttpLink({
  uri: APOLLO_URI
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link,
  cache
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

module.exports = {
  apolloProvider
}
