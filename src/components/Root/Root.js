const { default: Login } = require('../Login')
const { default: EntryNew } = require('../EntryNew')
const { default: Recent } = require('../Recent')

const Root = {
  components: {
    Login,
    Recent,
    EntryNew
  }
}

module.exports = Root
