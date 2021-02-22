const { default: EntryDisplay } = require('../EntryDisplay')
const { default: EntryEdit } = require('../EntryEdit')
const { reduce } = require('../../store')

// const {
//   mutations: {
//     EntryQ
//   }
// } = require('../../apollo')

const EntryList = {
  props: {
    entry: {
      type: Object,
      validator (entry) {
        if (entry)
          return true
      }
    },
    clickTag: {
      type: Function
    },
    clickDate: {
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
    clickTagHandler (tag) {
      reduce({
        FILTER_TAGS_APPEND: { tag }
      })
    },
    clickDateHandler (date) {
      reduce({
        FILTER_DATE_FROM: { dateFrom: date },
        FILTER_DATE_TO: { dateTo: date }
      })
    }
  }
}

module.exports = EntryList
