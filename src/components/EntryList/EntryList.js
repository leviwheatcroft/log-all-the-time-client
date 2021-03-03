const check = require('check-types')
const { default: EntryListItem } = require('./EntryListItem')

const EntryList = {
  components: {
    EntryListItem
  },
  methods: {

  },
  props: {
    entries: {
      // entries is an apollo query result, will be undefined if query has
      // not yet run
      required: false,
      type: Array,
      validator (entries) {
        return entries.every((e) => {
          return (
            check.containsKey(e, 'id') &&
            // check.string(e, e.id) &&
            check.containsKey(e, 'description') &&
            // check.string(e, e.description) &&
            check.containsKey(e, 'tags')
            // check.array(e, e.tags)
          )
        })
      }
    },
    clickTagHandler: {
      required: true,
      type: Function
    },
    clickDateHandler: {
      required: true,
      type: Function
    },
    showUser: {
      required: true,
      type: Boolean
    }
  }
}

module.exports = EntryList
