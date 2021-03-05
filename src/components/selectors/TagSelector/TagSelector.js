const Selector = require('../Selector/Selector.js')
const {
  queries: {
    TagPartialQ
  }
} = require('../../../apollo')

const TagSelector = {
  apollo: {
    tagSuggestions: {
      query: TagPartialQ,
      skip () { return this.tagPartial.length <= 3 },
      throttle: 500,
      update ({ TagPartialQ: tagSuggestions }) { return tagSuggestions },
      variables () { return { tagPartial: this.tagPartial } }
    }
  },
  ...Selector
}

module.exports = TagSelector
