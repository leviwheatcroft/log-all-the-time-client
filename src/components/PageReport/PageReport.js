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
      loadingKey: 'loading',
      variables () {
        const limit = 6
        const offset = 0
        return {
          ...this.queryFilters,
          limit,
          offset
        }
      },
      update ({ EntryFilterQ: { docs, hasMore } }) {
        this.hasMore = hasMore
        return docs
      }
    }
  },
  components: {
    EntryList,
    ReportFilters
  },
  data () {
    const {
      dateFrom,
      dateTo
    } = state.filters
    let {
      tags
    } = state.filters
    tags = tags.map((t) => t.id)
    let {
      users
    } = state.filters
    users = users.map((t) => t.id)
    return {
      fieldsToggleBoundaries: {
        date: null,
        description: true,
        duration: null,
        tags: null,
        user: null
      },
      state,
      loading: 0,
      entries: [],
      queryFilters: {
        dateFrom,
        dateTo,
        tags,
        users
      }
    }
  },
  methods: {
    fetchMoreEntries () {
      if (!this.hasMore)
        console.error('no more pages to fetch')
      const variables = {
        ...this.queryFilters,
        offset: this.entries.length,
        limit: 6
      }
      this.$apollo.queries.entries.fetchMore({
        variables
      })
    },
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
