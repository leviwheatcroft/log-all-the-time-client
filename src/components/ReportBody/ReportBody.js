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
      let {
        tags
      } = this.state.filters
      if (tags.length === 0)
        tags = tag
      else if (/,\s?$/.test(tags))
        tags = `${tags} ${tag}`
      else
        tags = `${tags}, ${tag}`
      reduce({
        action: 'UPDATE_REPORT_FILTER',
        data: { tags }
      })
    },
    clickDate (date) {
      reduce({
        action: 'UPDATE_REPORT_FILTER',
        data: { dateFrom: date, dateTo: date }
      })
    }
  }
}

module.exports = ReportBody
