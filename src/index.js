const { default: Vue } = require('vue')
const { default: VueApollo } = require('vue-apollo')
const { default: VueRouter } = require('vue-router')
const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')

dayjs.extend(duration)

const { apolloProvider } = require('./apollo')
const {
  App
} = require('./components')
const {
  router
} = require('./router')

Vue.use(VueRouter)
Vue.use(VueApollo)
Vue.prototype.$dayjs = dayjs

new Vue({
  render (h) { return h(App) },
  apolloProvider,
  router
  // render: function (h) { return h(Demo) }
}).$mount('#app')
