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
        const limit = 12
        const offset = 0
        return {
          ...this.filters,
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
  computed: {
    filters () {
      const {
        dateFrom,
        dateTo,
        tags,
        users
      } = this.rawFilters
      return {
        dateFrom,
        dateTo,
        tags: tags.map(({ id }) => id),
        users: users.map(({ id }) => id)
      }
    }
  },
  data () {
    const { filters: rawFilters } = state
    return {
      fieldsToggleBoundaries: {
        date: null,
        description: true,
        duration: null,
        tags: null,
        user: null
      },
      hasMore: true,
      rawFilters,
      loading: 0,
      entries: []
    }
  },
  methods: {
    fetchMoreEntries () {
      if (this.loading)
        return
      if (!this.hasMore)
        return
      const variables = {
        ...this.filters,
        offset: this.entries.length,
        limit: 12
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
