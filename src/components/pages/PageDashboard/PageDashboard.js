const { default: EntryInput } = require('../../EntryInput')
const { default: EntryList } = require('../../EntryList')
const { default: DurationByDay } = require('../../DurationByDay')
const { reduce } = require('../../../store')
const {
  queries: {
    EntryFilterQ
  }
} = require('../../../apollo')
const {
  types: {
    isMidnightUtc,
    isTag
  }
} = require('../../../lib')

const PageDashboard = {
  apollo: {
    entries: {
      query: EntryFilterQ,
      variables () {
        const limit = 24
        const offset = 0
        return {
          ...this.filters,
          limit,
          offset
        }
      },
      // skip () {
      //   console.log('skipper', this.entries.length)
      //
      //   return this.entries.length !== 0
      // },
      nextFetchPolicy: 'cache-only',
      update ({ EntryFilterQ: { docs, hasMore } }) {
        this.hasMore = hasMore
        return docs
      }
    }
  },
  components: {
    EntryInput,
    EntryList,
    DurationByDay
  },
  data () {
    return {
      filters: {
        self: true,
        sort: { createdAt: 'desc' }
      },
      fieldsToggleBoundaries: {
        date: null,
        description: true,
        duration: null,
        tags: null,
        user: false
      },
      entries: [],
      loading: 0,
      hasMore: true
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
      this.$router.push('/report')
    },
    clickDateHandler (date) {
      console.assert(
        isMidnightUtc(date),
        { date, msg: 'date is not midnightUtc' }
      )
      reduce({
        FILTER_DATE_FROM: { dateFrom: date },
        FILTER_DATE_TO: { dateTo: date }
      })
      this.$router.push('/report')
    },
    fetchMoreEntries () {
      if (this.loading)
        return
      if (!this.hasMore)
        return
      console.log('fm')
      const variables = {
        ...this.filters,
        offset: this.entries.length,
        limit: 24
      }
      this.$apollo.queries.entries.fetchMore({
        variables
      })
    }
  }
}

module.exports = PageDashboard
