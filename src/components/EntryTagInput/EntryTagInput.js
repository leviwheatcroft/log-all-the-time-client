const {
  queries: {
    TagPartialQ,
    EntryQ
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
  computed: {
    // recentTags () {
    //   // TODO how often does this run?
    //   console.log('compute recentTags')
    //   const { cache } = this.$apollo.getClient()
    //   const { EntryQ: entries } = cache.readQuery({ query: EntryQ })
    //   const recentTags = []
    //   entries.some((entry) => {
    //     entry.tags.some((t) => {
    //       if (recentTags.findIndex((_t) => t.tag === _t.tag) === -1)
    //         recentTags.push(t)
    //       if (recentTags.length === 6)
    //         return true
    //       return false
    //     })
    //     if (recentTags.length === 6)
    //       return true
    //     return false
    //   })
    //   return recentTags
    // }
  },
  props: [
    'tagNames'
  ],
  data () {
    return {
      hasFocus: false,
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
