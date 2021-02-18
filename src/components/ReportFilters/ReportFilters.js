const { default: DatePicker } = require('vue2-datepicker')

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
      dateRange: [new Date(), new Date()],
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
      this.$emit('apply', { dateFrom, dateTo, tags })
    }
  }
}

module.exports = ReportFilters
