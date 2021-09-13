import {
  isFunction,
  isFalse,
  isItems
} from '../../../lib/types'
import {
  hexFromString
} from '../../../lib/colors'

const Base = {
  data () {
    return {
      itemPartial: ''
    }
  },
  methods: {
    hexFromString (string) {
      return hexFromString(string)
    },
    clickItemNew (item) {
      this.itemNewHandler(item)
      this.reset()
    },
    clickItemAdd (item) {
      this.itemAddHandler(item)
      this.reset()
    },
    reset () {
      this.itemPartial = ''
      this.resetHandler()
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
      if (this.itemSuggestions.length) {
        this.itemAddHandler(this.itemSuggestions[0])
      } else if (this.itemNewHandler) {
        const itemName = this.itemPartial
        const item = { id: false, itemName }
        this.itemNewHandler(item)
      }
      this.reset()
    }
  },
  model: {
    prop: 'selectedItems',
    event: 'change'
  },
  props: {
    selectedItems: {
      required: true,
      type: Array,
      validator (items) {
        console.assert(
          isItems(items),
          { items, msg: 'items is not items' }
        )
        return true
      }
    },
    itemSuggestions: {
      required: true,
      type: Array,
      validator (items) {
        console.assert(
          isItems(items),
          { items, msg: 'items is not items' }
        )
        return true
      }
    },
    inputItemPartialHandler: {
      required: true,
      type: Function
    },
    itemAddHandler: {
      required: true,
      type: Function
    },
    itemRemoveHandler: {
      required: true,
      type: Function
    },
    itemNewHandler: {
      required: false,
      default: false,
      validator (itemNewHandler) {
        console.assert(
          isFalse(itemNewHandler) || isFunction(itemNewHandler),
          { itemNewHandler, msg: 'itemNewHandler is not function or false' }
        )
        return true
      }
    },
    inputTabindex: {
      required: false,
      type: Number
    },
    resetHandler: {
      required: true,
      type: Function
    }
  }

}

export default Base
