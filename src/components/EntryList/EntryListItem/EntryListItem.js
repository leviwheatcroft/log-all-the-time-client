const { default: EntryDisplay } = require('./EntryDisplay')
const { default: EntryInput } = require('../../EntryInput')

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
    },
    clickUserHandler: {
      type: Function
    },
    fieldsToggle: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      editing: false
    }
  },
  components: {
    EntryDisplay,
    EntryInput
  },
  methods: {
  }
}

module.exports = EntryListItem
