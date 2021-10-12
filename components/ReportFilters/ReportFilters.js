import DatePicker from 'vue2-datepicker'
import {
  EntryFilterAsCsvQ
} from '../../apollo/queries'

const ReportFilters = {
  components: {
    DatePicker
  },
  data () {
    const {
      dateRange,
      tags,
      projects,
      users
    } = this.filters
    return {
      dateRange,
      tags,
      projects,
      users,
      showExportOptions: false,
      exportDateFormat: 'DD/MM/YY',
      exportDurationFormat: 'HH:mm'
    }
  },
  methods: {
    clickApplyHandler () {
      const {
        dateRange,
        tags,
        projects,
        users
      } = this
      this.$emit('updateFilters', {
        dateRange,
        tags,
        projects,
        users,
      })
    },
    async clickExportCsvHandler () {
      const {
        dateRange: [dateFrom, dateTo],
        tags,
        projects,
        users,
        // exportDateFormat: dateFormat,
        // exportDurationFormat: durationFormat
      } = this
      const result = await this.$apollo.query({
        query: EntryFilterAsCsvQ,
        variables: {
          dateFrom,
          dateTo,
          tags,
          projects,
          users,
          // dateFormat,
          // durationFormat,
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
      // eslint-disable-next-line no-console
      console.log(a)
      a.href = window.URL.createObjectURL(blob)
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(a.href)
    }
  },
  props: {
    filters: {
      type: Object,
      required: true
    }
  }
}

export default ReportFilters
