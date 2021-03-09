const { default: Vue } = require('vue')
const { default: VueApollo } = require('vue-apollo')
const { default: VueRouter } = require('vue-router')
const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')

dayjs.extend(duration)

const { apolloProvider } = require('./src/apollo')
const {
  App
} = require('./src/components')
const {
  router
} = require('./src/router')

Vue.use(VueRouter)
Vue.use(VueApollo)
Vue.prototype.$dayjs = dayjs

new Vue({
  render (h) { return h(App) },
  apolloProvider,
  router
  // render: function (h) { return h(Demo) }
}).$mount('#app')
