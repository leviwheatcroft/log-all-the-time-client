import DatePicker from 'vue2-datepicker'
// import {
//   assert
// } from '../../lib/types'
import {
  EntryFilterAsCsvQ
} from '../../apollo/queries'
import {
  midnightUtcMs
} from '../../lib/dates'

const ReportFilters = {
  components: {
    DatePicker
  },
  data () {
    // const {
    //   dateFrom,
    //   dateTo,
    //   tags,
    //   project,
    //   users
    // } = this.filters
    return {
      // dateRange: [dateFrom, dateTo],
      // tags,
      // project,
      // users,
      showExportOptions: false,
      exportDateFormat: 'DD/MM/YY',
      exportDurationFormat: 'HH:mm'
    }
  },
  methods: {
    // tagAddHandler (tag) {
    //   assert('isTag', tag)
    //   this.tags.push(tag)
    // },
    // tagRemoveHandler (tag) {
    //   assert('isTag', tag)
    //   const idx = this.tags.findIndex((t) => t.id === tag.id)
    //   console.assert(
    //     idx !== -1,
    //     { tags: this.tags, tag, msg: 'tag not in tags' }
    //   )
    //   this.tags.splice(idx, 1)
    // },
    // userAddHandler (user) {
    //   assert('isUser', user)
    //   this.users.push(user)
    // },
    // userRemoveHandler (user) {
    //   assert('isUser', user)
    //   const idx = this.users.findIndex((u) => u.id === user.id)
    //   console.assert(
    //     idx !== -1,
    //     { tags: this.users, user, msg: 'tag not in tags' }
    //   )
    //   this.users.splice(idx, 1)
    // },
    clickApplyHandler () {
      // eslint-disable-next-line
      console.log('cph')
      const {
        dateRange,
        // projects,
        // tags,
        // users
      } = this.$refs
      // eslint-disable-next-line
      console.log(dateRange.getValue())
      this.$store.commit('reportFilters/apply', {
        dateRange: dateRange.getValue(),
        // projects: projects.getValue(),
        // tags: tags.getValue(),
        // users: users.getValue()
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
          dateFrom: midnightUtcMs(dateFrom),
          dateTo: midnightUtcMs(dateTo),
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
  },
  props: {
    // tagAddHandler (tag) {
    //   assert('isTag', tag)
    //   this.tags.push(tag)
    // },
    // tagRemoveHandler (tag) {
    //   assert(['isTag', 'isNewTag'], tag)
    //   const idx = this.tags.findIndex((t) => t.tagName === tag.tagName)
    //   console.assert(
    //     idx !== -1,
    //     { tags: this.tags, tag, msg: 'tag not in tags' }
    //   )
    //   this.tags.splice(idx, 1)
    // },
    // projectAddHandler (project) {
    //   this.project = assert('isNewProject', project)
    // },
    // projectRemoveHandler () {
    //   this.project = false
    // },
    // userAddHandler (user) {
    //   assert('isUser', user)
    //   this.user = user
    // },
    // userRemoveHandler () {
    //   this.user = false
    // },
    // filters: {
    //   required: true,
    //   type: Object
    // },
    // applyFilters: {
    //   required: true,
    //   type: Function
    // }
  }
}

export default ReportFilters
