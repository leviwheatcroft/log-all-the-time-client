const {
  queries: {
    TagPartialQ
  }
} = require('../../apollo')

const EntryTagInput = {
  apollo: {
    suggestions: {
      query: TagPartialQ,
      skip () {
        if (this.tagPartial.length < 3)
          return true
      },
      throttle: 500,
      update ({ TagPartialQ: suggestions }) {
        return suggestions
      },
      variables () {
        const {
          tagPartial
        } = this
        return { tagPartial }
      }
    }
  },
  props: [
    'tagNames'
  ],
  data () {
    return {
      suggestions: [],
      tagPartial: '',
      lastQuery: Date.now()
    }
  },
  methods: {
    clickAddSuggestion () {
      const tagName = this.tagPartial
      this.tagPartial = ''
      this.suggestions = []
      this.$emit('tagAdded', tagName)
    },
    clickSuggestion (tagName) {
      this.tagPartial = ''
      this.suggestions = []
      this.$emit('tagAdded', tagName)
    }
  }
}

module.exports = EntryTagInput
