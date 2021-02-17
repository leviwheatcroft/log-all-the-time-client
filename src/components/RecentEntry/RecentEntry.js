const { default: EntryDisplay } = require('../EntryDisplay')
const { default: EntryEdit } = require('../EntryEdit')

// const {
//   mutations: {
//     EntryQ
//   }
// } = require('../../apollo')

const RecentEntry = {
  props: [
    'entry'
  ],
  data () {
    return {
      editing: false
    }
  },
  components: {
    EntryDisplay,
    EntryEdit
  },
  methods: {}
}

module.exports = RecentEntry
