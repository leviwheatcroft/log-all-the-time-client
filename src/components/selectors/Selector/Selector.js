const check = require('check-types')
const {
  IconTag
} = require('../../../icons')

const Selector = {
  components: {
    IconTag
  },
  data () {
    return {
      tagPartial: ''
    }
  },
  methods: {
    clickSpacer () {
      this.$el.querySelector('input.tag-partial').focus()
    },
    reset () {
      this.tagPartial = ''
      this.tagSuggestions = []
    },
    keydownTagPartial (event) {
      if (
        event.keyCode !== 9 &&
        event.keyCode !== 13
      )
        return
      if (this.tagPartial === '')
        return
      // don't preventDefault, tab should move to next field
      // event.preventDefault()
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
    },
    inputTabindex: {
      required: false,
      type: Number
    }
  }

}

module.exports = Selector
