const {
  IconCalendar,
  IconClock,
  IconTag,
  IconUser
} = require('../../../../icons')
const {
  types: {
    isUser,
    isInteger,
    isTag,
    isEntry
  }
} = require('../../../../lib')
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
        console.assert(
          isEntry(entry),
          { entry, msg: 'entry is not entry' }
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
    fieldsToggle: {
      required: true,
      type: Object
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
      console.assert(
        isTag(tag),
        { tag, msg: 'tag is not tag' }
      )
      this.clickTagHandler(tag)
    },
    clickDate (date) {
      console.assert(
        isInteger(date),
        { date, msg: 'date is not integer' }
      )
      date = midnightUtc(new Date(date))
      this.clickDateHandler(date)
    },
    clickUser (user) {
      console.assert(
        isUser(user),
        { user, msg: 'user is not user' }
      )
      this.clickUserHandler(user)
    }
  }
}

module.exports = EntryDisplay
