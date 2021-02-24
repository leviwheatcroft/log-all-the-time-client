const check = require('check-types')
const {
  IconCalendar,
  IconClock,
  IconTag
} = require('../../../../icons')

const EntryDisplay = {
  components: {
    IconCalendar,
    IconClock,
    IconTag
  },
  props: {
    entry: {
      required: true,
      type: Object,
      validator (entry) {
        return (
          check.containsKey(entry, 'id') &&
          check.containsKey(entry, 'description')
        )
      }
    },
    clickTagHandler: {
      required: true,
      type: Function
    },
    clickDateHandler: {
      required: true,
      type: Function
    }
  },
  data () {
    return {
    }
  },
  methods: {
    clickTag (tag) {
      check.assert.containsKey(tag, 'id')
      check.assert.containsKey(tag, 'tagName')
      this.clickTagHandler(tag)
    },
    clickDate (date) {
      check.assert.integer(date)
      date = new Date(date)
      this.clickDateHandler(date)
    }
  }
}

module.exports = EntryDisplay
