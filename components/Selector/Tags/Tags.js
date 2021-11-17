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
        fetchPolicy: 'no-cache',
        variables: {
          tagPartial,
          limit: 12,
          includeArchived: false
        }
      })
      const { data: { TagPartialQ: { docs: tagSuggestions } } } = result
      return tagSuggestions.map(({ id, name }) => ({ id, name }))
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
