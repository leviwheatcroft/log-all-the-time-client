const { default: DatePicker } = require('vue2-datepicker')
const check = require('check-types')
const { reduce, state } = require('../../store')
const { TagSelector } = require('../selectors')

const {
  queries: {
    EntryFilterAsCsvQ
  }
} = require('../../apollo')
const {
  IconDownload,
  IconCalendar,
  IconFileText,
  IconX,
  IconChevronUp,
  IconChevronDown,
  IconClock
} = require('../../icons')
const {
  dates: {
    midnightUtc
  }
} = require('../../lib')

const ReportFilters = {
  components: {
    DatePicker,
    IconCalendar,
    IconDownload,
    IconFileText,
    IconX,
    TagSelector,
    IconChevronUp,
    IconChevronDown,
    IconClock
  },
  data () {
    const {
      filters: { dateFrom, dateTo, tags }
    } = state
    return {
      state,
      dateRange: [dateFrom, dateTo],
      tags: [...tags],
      showExportOptions: false,
      exportDateFormat: 'DD/MM/YY',
      exportDurationFormat: 'HH:mm'
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
        FILTER_DATE_FROM: { dateFrom: midnightUtc(dateFrom) },
        FILTER_DATE_TO: { dateTo: midnightUtc(dateTo) },
        FILTER_TAGS_REPLACE: { tags }
      })
    },
    async exportCsv () {
      const {
        dateRange: [dateFrom, dateTo],
        tags,
        exportDateFormat: dateFormat,
        exportDurationFormat: durationFormat
      } = this
      const result = await this.$apollo.query({
        query: EntryFilterAsCsvQ,
        variables: {
          dateFrom: midnightUtc(dateFrom),
          dateTo: midnightUtc(dateTo),
          dateFormat,
          durationFormat,
          tags
        }
      })
      const {
        data: {
          EntryFilterAsCsvQ: csv
        }
      } = result

      const filename = 'export.csv'
      const blob = new Blob([csv], { type: 'text/csv' })

      // https://stackoverflow.com/a/33542499/441930
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename)
        return
      }
      const a = this.$el.querySelector('a.download')
      a.href = window.URL.createObjectURL(blob)
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(a.href)
    }
  }
}

module.exports = ReportFilters
