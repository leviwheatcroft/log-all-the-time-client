const { default: EntryListItem } = require('./EntryListItem')
const { default: Fields } = require('./Fields')
const { state } = require('../../store')
const {
  types: {
    isEntries
  }
} = require('../../lib')

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
        console.assert(
          isEntries(entries),
          { entries, msg: 'entries is not entries' }
        )
        return true
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
    },
    fetchMoreEntries: {
      required: false,
      type: Function
    },
    hasMoreEntries: {
      required: false,
      type: Boolean
    }
  }
}

module.exports = EntryList
