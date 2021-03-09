const { default: VueRouter } = require('vue-router')
const {
  routes
} = require('./routes')
const {
  authentication
} = require('./authentication')

const router = new VueRouter({ routes })

router.beforeEach(authentication)

module.exports = {
  router
}
