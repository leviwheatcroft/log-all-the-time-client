const check = require('check-types')
const {
  IconCalendar,
  IconClock,
  IconTag,
  IconUser
} = require('../../../../icons')
const {
  dates: {
    midnightUtc
  },
  colors: {
    hexFromString
  }
} = require('../../../../lib')

const EntryDisplay = {
  components: {
    IconCalendar,
    IconClock,
    IconTag,
    IconUser
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
    },
    showUser: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  methods: {
    hexFromString (str) {
      return hexFromString(str)
    },
    clickTag (tag) {
      check.assert.containsKey(tag, 'id')
      check.assert.containsKey(tag, 'tagName')
      this.clickTagHandler(tag)
    },
    clickDate (date) {
      check.assert.integer(date)
      date = midnightUtc(new Date(date))
      this.clickDateHandler(date)
    }
  }
}

module.exports = EntryDisplay
