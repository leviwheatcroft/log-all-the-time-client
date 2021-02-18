const { default: DatePicker } = require('vue2-datepicker')
const { reduce, state } = require('../../store')

const ReportFilters = {
  components: {
    DatePicker
  },
  computed: {
    dateFrom () { return this.dateRange[0] },
    dateTo () { return this.dateRange[1] }
  },
  data () {
    return {
      state,
      dateRange: [state.filters.dateFrom, state.filters.dateTo],
      tags: ''
    }
  },
  methods: {
    apply () {
      const {
        dateFrom,
        dateTo,
        tags
      } = this
      reduce({
        action: 'UPDATE_REPORT_FILTER',
        data: { dateFrom, dateTo, tags }
      })
    }
  }
}

module.exports = ReportFilters
