const { default: EntryInput } = require('../EntryInput')
const { default: EntryList } = require('../EntryList')
const {
  queries: {
    EntryQ
  }
} = require('../../apollo')

const PageDashboard = {
  apollo: {
    entries: {
      query: EntryQ,
      // variables () {
      //   const {
      //     dateFrom,
      //     dateTo
      //   } = this.state.filters
      //   let {
      //     tags
      //   } = this.state.filters
      //   tags = tags.map((t) => t.id)
      //   return { dateFrom, dateTo, tags }
      // },
      update ({ EntryQ: entries }) {
        console.log(entries)
        return entries
      }
    }
  },
  components: {
    EntryInput,
    EntryList
  },
  methods: {
    clickTagHandler (tag) {

    },
    clickDateHandler (date) {

    }
  }
}

module.exports = PageDashboard
