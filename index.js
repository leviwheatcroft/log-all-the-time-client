const { default: Vue } = require('vue')
const { default: VueApollo } = require('vue-apollo')
const { Root } = require('./src/components')
const { apolloProvider } = require('./src/apollo')

Vue.use(VueApollo)

new Vue({
  render (h) { return h(Root) },
  apolloProvider
  // render: function (h) { return h(Demo) }
}).$mount('#app')
