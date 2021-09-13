import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { apolloProvider } from '../apollo'

Vue.use(VueApollo)

export default function apolloPlugin (ctx) {
  const {
    app
  } = ctx
  app.apolloProvider = apolloProvider
}
