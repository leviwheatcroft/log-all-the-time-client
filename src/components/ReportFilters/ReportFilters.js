const { default: DatePicker } = require('vue2-datepicker')
const check = require('check-types')
const { reduce, state } = require('../../store')
const { default: TagSelector } = require('../TagSelector')

const ReportFilters = {
  components: {
    DatePicker,
    TagSelector
  },
  data () {
    const {
      filters: { dateFrom, dateTo, tags }
    } = state
    return {
      state,
      dateRange: [dateFrom, dateTo],
      tags: [...tags]
    }
  },
  watch: {
    'state.filters.dateFrom': function stateFiltersDateFrom () {
      this.dateRange.splice(0, 1, this.state.filters.dateFrom)
    },
    'state.filters.dateTo': function stateFiltersDateTo () {
      this.dateRange.splice(1, 1, this.state.filters.dateTo)
    },
    'state.filters.tags': function stateFiltersTags () {
      this.tags = [...this.state.filters.tags]
    }
  },
  methods: {
    tagAddHandler (tag) {
      this.tags.push(tag)
    },
    tagRemoveHandler (tag) {
      const idx = this.tags.findIndex((t) => t.id === tag.id)
      check.assert.greater(idx, -1)
      this.tags.splice(idx, 1)
    },
    apply () {
      const {
        dateRange: [dateFrom, dateTo],
        tags
      } = this
      reduce({
        FILTER_DATE_FROM: { dateFrom },
        FILTER_DATE_TO: { dateTo },
        FILTER_TAGS_REPLACE: { tags }
      })
    }
  }
}

module.exports = ReportFilters
