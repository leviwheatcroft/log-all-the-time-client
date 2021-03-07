const check = require('check-types')
const { default: EntryListItem } = require('./EntryListItem')
const { default: Fields } = require('./Fields')
const { state } = require('../../store')

const EntryList = {
  components: {
    EntryListItem,
    Fields
  },
  data () {
    return {
      stateFieldsToggle: state.entryList.fieldsToggle
    }
  },
  computed: {
    fieldsToggle () {
      const fieldsToggle = Object.fromEntries(
        Object.entries(this.stateFieldsToggle).map(([key, value]) => {
          const boundary = this.fieldsToggleBoundaries[key]
          return boundary === null ? [key, value] : [key, boundary]
        })
      )
      return fieldsToggle
    }
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
    clickUserHandler: {
      required: false,
      type: Function
    },
    fieldsToggleBoundaries: {
      required: true,
      type: Object
    }
  }
}

module.exports = EntryList
