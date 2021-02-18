const { default: ReportBody } = require('../ReportBody')
const { default: ReportFilters } = require('../ReportFilters')

const PageReport = {
  components: {
    ReportBody,
    ReportFilters
  },
  data () {
    // const dateFrom = new Date()
    // dateFrom.setHours(0, 0, 0, 0)
    // const dateTo = new Date(dateFrom)
    // dateTo.setDate(dateTo.getDate() + 1)
    const dateFrom = new Date()
    dateFrom.setHours(0, 0, 0, 0)
    const dateTo = dateFrom
    return {
      dateFrom,
      dateTo,
      tags: ''
    }
  },
  methods: {
    apply (filter) {
      console.log(filter)
      // eslint-disable-next-line no-return-assign
      Object.entries(filter).forEach(([k, v]) => this.$data[k] = v)
    }
  }
}

module.exports = PageReport
