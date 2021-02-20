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
        const {
          dateFrom,
          dateTo,
          tags
        } = this.state.filters
        return { dateFrom, dateTo, tags }
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
    clickTag (tagString) {
      reduce({
        FILTER_TAGS_APPEND: { tagString }
      })
    },
    clickDate (date) {
      date = new Date(date)
      reduce({
        FILTER_DATE_FROM: { dateFrom: date },
        FILTER_DATE_TO: { dateTo: date }
      })
    }
  }
}

module.exports = ReportBody
