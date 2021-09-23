import _throttle from 'lodash/throttle'
// TODO: these isX type checks are deprecated
import {
  isArray,
  isTag,
  isNewTag,
} from '../../../lib/types'
import {
  TagPartialQ
} from '../../../apollo/queries'

const Tag = {
  data () {
    return {
      itemPartial: '',
      itemSuggestions: [],
      lastItemPartial: false,
      loading: 0
    }
  },
  computed: {
    selectedItems () {
      return this.tags.map((tag) => {
        return {
          ...tag,
          itemName: tag.tagName
        }
      })
    }
  },
  methods: {
    inputItemPartialHandler (itemPartial) {
      this.itemPartial = itemPartial

      const {
        itemSuggestions,
        lastItemPartial,
        loading
      } = this

      // don't send if we don't have enough text to generate meaningful results
      if (itemPartial.length < 3)
        return

      // don't send if there's already a query in flight
      if (loading)
        return

      // send if we haven't done the query at least once since reset
      if (!lastItemPartial)
        return this.itemSuggestionsQuery()

      // send if we have any suggests from the last query
      // even if there's only one remaining suggestion, we still need to query
      // again in case the additional text excludes the one suggestion we have
      if (itemSuggestions.length)
        return this.itemSuggestionsQuery()

      // send if the tagPartial sent with the last query is not included
      // in the current tagPartial. This accounts for deleting text.
      if (!itemPartial.includes(lastItemPartial))
        return this.itemSuggestionsQuery()
    },
    // itemSuggestionsQuery can't be included as an apollo smartQuery from
    // vue-apollo because we need to micro-manage whether the query will be
    // sent, and the skip() functionality doesn't work for this use case
    itemSuggestionsQuery: _throttle(async function itemSuggestionsQuery () {
      this.lastItemPartial = this.itemPartial
      this.loading += 1
      const result = await this.$apollo.query({
        query: TagPartialQ,
        loadingKey: 'loading',
        variables: { tagPartial: this.itemPartial }
      })
      let { data: { TagPartialQ: itemSuggestions } } = result
      itemSuggestions = itemSuggestions.map((i) => {
        return {
          ...i,
          itemName: i.tagName
        }
      })
      this.itemSuggestions = itemSuggestions
      this.loading -= 1
    }, 500),
    resetHandler () {
      this.lastItemPartial = false
    }
  },
  props: {
    tags: {
      required: true,
      type: Array,
      validator (tags) {
        console.assert(isArray(tags), { tags }, 'malformed Array')
        console.assert(
          tags.every((t) => isTag(t) || isNewTag(t)),
          { tags },
          'malformed Tag'
        )
        return true
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
      required: true,
      type: Function
    },
    inputTabindex: {
      required: true,
      type: Number
    }
  }
}

export default Tag
