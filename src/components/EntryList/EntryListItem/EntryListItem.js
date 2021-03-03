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
    showUser: {
      type: Boolean,
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
