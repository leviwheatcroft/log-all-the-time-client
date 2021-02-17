// const { default: EntryDisplay } = require('../EntryDisplay')
// const { default: EntryEdit } = require('../EntryEdit')
const { default: RecentEntry } = require('../RecentEntry')

const {
  queries: {
    EntryQ
  }
} = require('../../apollo')

const Recent = {
  data () {
    return {
      entries: [],
      editing: false
    }
  },
  apollo: {
    entries: {
      query: EntryQ,
      update ({ EntryQ }) {
        return EntryQ
      }
    }
  },
  components: {
    RecentEntry
  },
  methods: {
    edit (id) {
      const entry = this.entries.find((e) => e.id === id)
      entry.editing = true
    }
  }
}

module.exports = Recent
