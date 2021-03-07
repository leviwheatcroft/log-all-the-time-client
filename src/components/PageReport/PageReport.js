const { default: EntryList } = require('../EntryList')
const { default: ReportFilters } = require('../ReportFilters')
const { reduce } = require('../../store')
const {
  queries: {
    EntryFilterQ
  }
} = require('../../apollo')
const { state } = require('../../store')
const {
  types: {
    isUser,
    isTag,
    isDate
  }
} = require('../../lib')

const PageReport = {
  apollo: {
    entries: {
      query: EntryFilterQ,
      variables () {
        const {
          dateFrom,
          dateTo
        } = this.state.filters
        let {
          tags
        } = this.state.filters
        tags = tags.map((t) => t.id)
        let {
          users
        } = this.state.filters
        users = users.map((t) => t.id)
        return {
          dateFrom,
          dateTo,
          tags,
          users
        }
      },
      update ({ EntryFilterQ: entries }) {
        return entries
      }
    }
  },
  components: {
    EntryList,
    ReportFilters
  },
  data () {
    return {
      fieldsToggleBoundaries: {
        date: null,
        description: true,
        duration: null,
        tags: null,
        user: null
      },
      state,
      entries: []
    }
  },
  methods: {
    clickTagHandler (tag) {
      console.assert(
        isTag(tag),
        { tag, msg: 'tag is not tag' }
      )
      reduce({
        FILTER_TAGS_APPEND: { tag }
      })
    },
    clickDateHandler (date) {
      console.assert(
        isDate(date),
        { date, msg: 'date is not date' }
      )
      reduce({
        FILTER_DATE_FROM: { dateFrom: date },
        FILTER_DATE_TO: { dateTo: date }
      })
    },
    clickUserHandler (user) {
      console.assert(
        isUser(user),
        { user, msg: 'user is not user' }
      )
      reduce({
        FILTER_USERS_APPEND: { user }
      })
    }
  }
}

module.exports = PageReport
