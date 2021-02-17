const ReportFilters = {
  data () {
    return {
      dateFrom: '',
      dateTo: '',
      tags: ''
    }
  },
  methods: {
    apply () {
      const {
        dateFrom,
        dateTo,
        tags
      } = this.$data
      this.$emit('apply', { dateFrom, dateTo, tags })
    }
  }
}

module.exports = ReportFilters
