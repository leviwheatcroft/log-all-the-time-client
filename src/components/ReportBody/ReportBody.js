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
      update ({ EntryFilterQ }) {
        return EntryFilterQ
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
