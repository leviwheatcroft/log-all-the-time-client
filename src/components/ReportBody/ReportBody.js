const { default: EntryDisplay } = require('../EntryDisplay')
const {
  queries: {
    EntryFilterQ
  }
} = require('../../apollo')

const ReportBody = {
  apollo: {
    entries: {
      query: EntryFilterQ,
      variables () {
        return {
          ...this.dateFrom ? { dateFrom: this.dateFrom } : {},
          ...this.dateTo ? { dateTo: this.dateTo } : {},
          ...this.tags ? { tags: this.tags } : {}
        }
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
    return { entries: [] }
  },
  props: [
    'dateFrom',
    'dateTo',
    'tags'
  ]
}

module.exports = ReportBody
