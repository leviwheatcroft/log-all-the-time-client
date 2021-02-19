const { default: EntryDisplay } = require('../EntryDisplay')
const {
  queries: {
    EntryFilterQ
  }
} = require('../../apollo')
const { state, reduce } = require('../../store')

const ReportBody = {
  apollo: {
    entries: {
      query: EntryFilterQ,
      variables () {
        return this.state.filters
      },
      update ({ EntryFilterQ: entries }) {
        return entries
      }
    }
  },
  components: {
    EntryDisplay
  },
  data () {
    return {
      state,
      entries: []
    }
  },
  methods: {
    clickTag (tag) {
      const {
        tags
      } = this.state.filters
      tags.push(tag)
      reduce({
        action: 'UPDATE_REPORT_FILTER',
        data: { tags }
      })
    },
    clickDate (date) {
      date = new Date(date)
      reduce({
        action: 'UPDATE_REPORT_FILTER',
        data: { dateFrom: date, dateTo: date }
      })
    }
  }
}

module.exports = ReportBody
