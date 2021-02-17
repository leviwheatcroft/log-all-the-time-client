const { default: DatePicker } = require('vue2-datepicker')

const ReportFilters = {
  components: {
    DatePicker
  },
  computed: {
    dateFrom () { return this.dateRange[0] },
    dateTo () { return this.dateRange[0] }
  },
  data () {
    return {
      dateRange: [new Date(), new Date()],
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
