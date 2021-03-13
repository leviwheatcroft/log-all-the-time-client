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
    itemSuggestions: {
      query: TagPartialQ,
      skip () { return this.itemPartial.length < 3 },
      throttle: 500,
      update ({ TagPartialQ: itemSuggestions }) {
        itemSuggestions = itemSuggestions.map((i) => {
          return {
            ...i,
            itemName: i.tagName
          }
        })
        return itemSuggestions
      },
      variables () { return { tagPartial: this.itemPartial } }
    }
  },
  components: {
    IconTag,
    Selector
  },
  data () {
    return {
      itemPartial: '',
      itemSuggestions: []
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
    }
  }
}

module.exports = TagSelector
