import _throttle from 'lodash/throttle'
import {
  classes
} from '../../../componentMixins'

const Base = {
  data () {
    return {
      itemPartial: '',
      itemSuggestions: [],
      loading: false
    }
  },
  computed: {
    _items () {
      const {
        isMultiItem,
        items
      } = this
      if (isMultiItem)
        return items
      else if (items)
        return [items]
      else
        return []
    }
  },
  methods: {
    clickItemAdd (item) {
      this.updateItems([...this._items, item])
      this.itemPartial = ''
    },
    clickItemRemove ({ name }) {
      this.updateItems(this._items.filter((i) => i.name !== name))
      this.itemPartial = ''
    },
    updateItems (items) {
      const {
        isMultiItem
      } = this
      if (isMultiItem)
        this.$emit('updateItems', items)
      else if (items.length)
        this.$emit('updateItems', items[items.length - 1])
      else
        this.$emit('updateItems', null)
    },
    keydownItemPartial (event) {
      if (
        event.keyCode !== 9 &&
        event.keyCode !== 13
      )
        return
      if (this.itemPartial === '')
        return
      // don't preventDefault, tab should move to next field
      // event.preventDefault()
      if (this.itemSuggestions.length)
        this.updateItems([...this._items, this.itemSuggestions[0]])
      else if (this.allowNewItem)
        this.updateItems([...this._items, { id: 0, name: this.itemPartial }])
      this.itemPartial = ''
    },
    inputItemPartial (itemPartial) {
      this.itemPartial = itemPartial

      const {
        itemSuggestions,
        lastItemPartial,
        loading
      } = this

      // don't send if we don't have enough text to generate meaningful results
      if (this.itemPartial.length < 3)
        return

      // don't send if there's already a query in flight
      if (loading)
        return

      if (
        // trigger if we haven't done the query at least once since reset
        !lastItemPartial ||
        // trigger if we have any suggests from the last query
        // even if there's only one remaining suggestion, we still need to query
        // again in case the additional text excludes the one suggestion we have
        itemSuggestions.length ||
        // trigger if the partial sent with the last query is not included
        // in the current partial. This accounts for deleting text.
        !this.itemPartial.includes(lastItemPartial)
      )
        this.fetchItemSuggestions()
    },
    fetchItemSuggestions: _throttle(async function fetchItemSuggestions () {
      this.lastItemPartial = this.itemPartial
      this.loading += 1
      this.itemSuggestions = await this.itemsQuery(this.itemPartial)
      this.loading -= 1
    }, 500)
  },
  mixins: [classes],
  props: {
    allowNewItem: {
      required: true,
      type: Boolean,
    },
    isMultiItem: {
      required: true,
      type: Boolean,
    },
    items: {
      required: true,
      validator (items) {
        if (items === null)
          return true
        return [].concat(items).every((i) => (
          Number.isInteger(i.id) && // id will be 0 (falsy) for new items
          typeof i.name === 'string'
        ))
      }
    },
    itemsQuery: {
      required: true,
      type: Function
    },
    inputTabindex: {
      required: false,
      type: Number
    },
  }

}

export default Base
