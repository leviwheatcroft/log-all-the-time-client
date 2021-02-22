const { default: EntryDisplay } = require('../EntryDisplay')
const { default: EntryEdit } = require('../EntryEdit')

const EntryListItem = {
  props: {
    entry: {
      type: Object,
      validator (entry) {
        if (entry)
          return true
      }
    },
    clickTagHandler: {
      type: Function
    },
    clickDateHandler: {
      type: Function
    }
  },
  data () {
    return {
      editing: false
    }
  },
  components: {
    EntryDisplay,
    EntryEdit
  },
  methods: {
  }
}

module.exports = EntryListItem
