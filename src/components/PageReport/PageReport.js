const { default: ReportBody } = require('../ReportBody')
const { default: ReportFilters } = require('../ReportFilters')

const PageReport = {
  components: {
    ReportBody,
    ReportFilters
  },
  data () {
    return {
      dateFrom: '',
      dateTo: '',
      tags: ''
    }
  },
  methods: {
    apply (filter) {
      // eslint-disable-next-line no-return-assign
      Object.entries(filter).forEach(([k, v]) => this.$data[k] = v)
    }
  }
}

module.exports = PageReport
