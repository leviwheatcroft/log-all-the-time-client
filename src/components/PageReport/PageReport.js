const check = require('check-types')
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
    isUser
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
      state,
      entries: []
    }
  },
  methods: {
    clickTagHandler (tag) {
      check.assert.containsKey(tag, 'id')
      check.assert.containsKey(tag, 'tagName')
      reduce({
        FILTER_TAGS_APPEND: { tag }
      })
    },
    clickDateHandler (date) {
      check.assert.date(date)
      reduce({
        FILTER_DATE_FROM: { dateFrom: date },
        FILTER_DATE_TO: { dateTo: date }
      })
    },
    clickUserHandler (user) {
      if (!isUser(user))
        throw new RangeError('user is not user')
      reduce({
        FILTER_USERS_APPEND: { user }
      })
    }
  }
}

module.exports = PageReport
