const { default: EntryDisplay } = require('../EntryDisplay')
const {
  queries: {
    EntryFilterQ
  }
} = require('../../apollo')
const { state } = require('../../store')

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
  }
}

module.exports = ReportBody
