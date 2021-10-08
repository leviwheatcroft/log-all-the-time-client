import {
  TagPartialQ
} from '../../../apollo/queries'
import {
  classes
} from '../../../componentMixins'

const Tag = {
  methods: {
    async tagsQuery (tagPartial) {
      const result = await this.$apollo.query({
        query: TagPartialQ,
        variables: { tagPartial }
      })
      const { data: { TagPartialQ: tagSuggestions } } = result
      return tagSuggestions
    }
  },
  mixins: [classes],
  props: {
    allowNewItem: {
      required: true,
      type: Boolean
    },
    isMultiItem: {
      required: true,
      type: Boolean
    },
    items: {
      required: true
    },
    inputTabindex: {
      required: true,
      type: Number
    }
  }
}

export default Tag
