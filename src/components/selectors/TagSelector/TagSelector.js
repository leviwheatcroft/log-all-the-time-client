const _throttle = require('lodash/throttle')
const { default: Selector } = require('../Selector')
const {
  IconTag
} = require('../../../icons')
const {
  types: {
    isArray,
    isTag,
    isNewTag,
    isFunction,
    isFalse
  }
} = require('../../../lib')
const {
  queries: {
    TagPartialQ
  }
} = require('../../../apollo')

const TagSelector = {
  apollo: {
    // itemSuggestions: {
    //   query: TagPartialQ,
    //   skip (vm, queryKey) {
    //     const {
    //       $apollo: { queries },
    //       itemPartial,
    //       itemSuggestions,
    //       lastItemPartial,
    //     } = vm
    //
    //     // if the partial is too short for any useful results, then skip
    //     if (itemPartial.length < 3)
    //       return true
    //
    //     // if we're still loading the last query, then skip
    //     if (queries[queryKey].loading)
    //       return true
    //
    //     // if this is the first query, then send
    //     if (!lastItemPartial)
    //       return false
    //
    //     // if the last query had more than 1 result, then send
    //     if (itemSuggestions.length > 1)
    //       return false
    //
    //     // if the last query didn't have more than 1 result, and the
    //     // tagPartial hasn't changed, then skip
    //     const itemPartialSlice = this.itemPartial
    //       .slice(0, lastItemPartial.length)
    //     if (this.lastItemPartial === itemPartialSlice) {
    //       console.log('skipping dead query')
    //       return true
    //     }
    //   },
    //   throttle: 500,
    //   update ({ TagPartialQ: itemSuggestions }) {
    //     itemSuggestions = itemSuggestions.map((i) => {
    //       return {
    //         ...i,
    //         itemName: i.tagName
    //       }
    //     })
    //     console.log(itemSuggestions)
    //     return itemSuggestions
    //   },
    //   variables () {
    //     this.lastItemPartial = this.itemPartial
    //     return { tagPartial: this.itemPartial }
    //   }
    // }
  },
  components: {
    IconTag,
    Selector
  },
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
        if (!isArray(tags))
          return false
        if (!tags.every((i) => isTag(i) || isNewTag(i)))
          return false
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
      required: false,
      default: false,
      validator (tagNewHandler) {
        return (
          isFalse(tagNewHandler) ||
          isFunction(tagNewHandler)
        )
      }
    },
    inputTabindex: {
      required: true,
      type: Number
    }
  }
}

module.exports = TagSelector
