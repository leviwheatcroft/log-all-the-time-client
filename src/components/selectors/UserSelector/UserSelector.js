const { default: Selector } = require('../Selector')
const {
  IconUser
} = require('../../../icons')
const {
  types: {
    isArray,
    isUser
  }
} = require('../../../lib')
const {
  queries: {
    UserPartialQ
  }
} = require('../../../apollo')

const UserSelector = {
  apollo: {
    itemSuggestions: {
      query: UserPartialQ,
      skip () { return this.itemPartial.length < 3 },
      throttle: 500,
      update ({ UserPartialQ: itemSuggestions }) {
        // eslint-disable-next-line no-return-assign
        itemSuggestions.forEach((i) => i.itemName = i.username)
        return itemSuggestions
      },
      variables () { return { userPartial: this.itemPartial } }
    }
  },
  components: {
    IconUser,
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
      return this.users.map((user) => {
        return {
          ...user,
          itemName: user.username
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
    users: {
      required: true,
      type: Array,
      validator (users) {
        if (!isArray(users))
          return false
        if (!users.every((i) => isUser(i)))
          return false
        return true
      }
    },
    userAddHandler: {
      required: true,
      type: Function
    },
    userRemoveHandler: {
      required: true,
      type: Function
    }
  }
}

module.exports = UserSelector
