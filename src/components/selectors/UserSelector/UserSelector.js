const Selector = require('../Selector/Selector.js')
const {
  queries: {
    UserPartialQ
  }
} = require('../../../apollo')

const UserSelector = {
  apollo: {
    tagSuggestions: {
      query: UserPartialQ,
      skip () { return this.itemPartial.length <= 3 },
      throttle: 500,
      update ({ UserPartialQ: itemSuggestions }) { return itemSuggestions },
      variables () { return { itemPartial: this.itemPartial } }
    }
  },
  ...Selector
}

module.exports = UserSelector
