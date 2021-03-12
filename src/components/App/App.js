const { default: Nav } = require('../Nav')
const { default: Footer } = require('../Footer')
const { default: ErrorHandler } = require('../ErrorHandler')
const { reduce, state } = require('../../store')
const {
  queries: {
    SelfQ
  }
} = require('../../apollo')

const App = {
  async beforeCreate () {
    if (!state.auth.loggedIn)
      return
    const result = await this.$apollo.query({
      query: SelfQ
    })
    const {
      data: { SelfQ: user }
    } = result
    reduce({
      USER_LOG_IN: { user }
    })
  },
  components: {
    Nav,
    Footer,
    ErrorHandler
  }
}

module.exports = App
