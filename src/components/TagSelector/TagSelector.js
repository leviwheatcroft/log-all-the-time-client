// const { reduce, state } = require('../../store')
const check = require('check-types')
const {
  queries: {
    TagPartialQ
  }
} = require('../../apollo')

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
  data () {
    return {
      tagPartial: ''
    }
  },
  methods: {
    reset () {
      this.tagPartial = ''
      this.tagSuggestions = []
    },
    keydownTagPartial (event) {
      if (event.keyCode !== 9)
        return
      event.preventDefault()
      if (this.tagSuggestions.length) {
        this.tagAddHandler(this.tagSuggestions[0])
      } else if (this.tagNewHandler) {
        const tagName = this.tagPartial
        const tag = { tagName }
        this.tagNewHandler(tag)
      }
      this.reset()
    },
    clickTagSuggestion (id) {
      const tag = this.tagSuggestions.find((t) => t.id === id)
      check.assert.not.undefined(tag)
      this.tagAddHandler(tag)
      this.reset()
    },
    clickTagRemove (id) {
      const tag = this.selectedTags.find((t) => t.id === id)
      check.assert.not.undefined(tag)
      this.tagRemoveHandler(tag)
    },
    clickTagNew () {
      const tagName = this.tagPartial
      const tag = { tagName }
      this.tagNewHandler(tag)
    }
  },
  props: {
    selectedTags: {
      required: true,
      type: Array,
      validator (selectedTags) {
        return check.array.of.containsKey(selectedTags, 'tagName')
      }
    },
    tagAddHandler: {
      required: true,
      type: Function
    },
    tagRemoveHandler: {
      required: true,
      type: Function
    },
    tagNewHandler: {
      required: false,
      type: Function
    }
  }

}

module.exports = TagSelector
