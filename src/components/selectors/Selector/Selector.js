const check = require('check-types')
const {
  IconX,
  IconLoader
} = require('../../../icons')
const {
  types: {
    isFunction,
    isFalse
  },
  colors: {
    hexFromString
  }
} = require('../../../lib')

const Selector = {
  components: {
    IconX,
    IconLoader
  },
  data () {
    return {
      itemPartial: ''
    }
  },
  methods: {
    // clickSpacer () {
    //   this.$el.querySelector('input.item-partial').focus()
    // },
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
        const item = { itemName }
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
        if (!check.array(items))
          return false
        return items.every((i) => {
          return (
            (
              check.string(i.id) ||
              i.id === false
            ) &&
            check.string(i.itemName)
          )
        })
      }
    },
    itemSuggestions: {
      required: true,
      type: Array,
      validator (items) {
        if (!check.array(items))
          return false
        return items.every((i) => {
          return (
            (
              check.string(i.id) ||
              check.undefined(i.id)
            ) &&
            check.string(i.itemName)
          )
        })
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
        return (
          isFunction(itemNewHandler) ||
          isFalse(itemNewHandler)
        )
      }
    },
    inputTabindex: {
      required: false,
      type: Number
    }
  }

}

module.exports = Selector
