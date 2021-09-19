import {
  assert
} from '../../../../lib/types'
import {
  midnightUtc
} from '../../../../lib/dates'
import {
  hexFromString
} from '../../../../lib/colors'

const EntryDisplay = {
  props: {
    entry: {
      required: true,
      type: Object,
      validator (entry) { return assert('isEntry', entry) }
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
    clickProjectHandler: {
      required: true,
      type: Function
    },
    fieldsToggle: {
      required: true,
      type: Object
    },
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
      assert('isTag', tag)
      this.clickTagHandler(tag)
    },
    clickDate (date) {
      assert('isInteger', date)
      date = midnightUtc(new Date(date))
      this.clickDateHandler(date)
    },
    clickProject (project) {
      assert('isProject', project)
      this.clickProjectHandler(project)
    },
    clickUser (user) {
      assert('isUser', user)
      this.clickUserHandler(user)
    }
  }
}

export default EntryDisplay
