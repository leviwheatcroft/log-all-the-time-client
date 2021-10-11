import {
  UserPartialQ
} from '../../../apollo/queries'
import {
  classes
} from '../../../componentMixins'

const Users = {
  methods: {
    async usersQuery (userPartial) {
      const result = await this.$apollo.query({
        query: UserPartialQ,
        variables: { userPartial }
      })
      const { data: { UserPartialQ: userSuggestions } } = result
      return userSuggestions.map(({ id, name }) => ({ id, name }))
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

export default Users
