const { default: EntryInput } = require('../EntryInput')
const { default: EntryList } = require('../EntryList')
const { default: DurationByDay } = require('../DurationByDay')
const { reduce } = require('../../store')
const {
  queries: {
    EntryQ
  }
} = require('../../apollo')
const {
  types: {
    isMidnightUtc,
    isTag
  }
} = require('../../lib')

const PageDashboard = {
  apollo: {
    entries: {
      query: EntryQ,
      // variables () {
      //   const {
      //     dateFrom,
      //     dateTo
      //   } = this.state.filters
      //   let {
      //     tags
      //   } = this.state.filters
      //   tags = tags.map((t) => t.id)
      //   return { dateFrom, dateTo, tags }
      // },
      update ({ EntryQ: entries }) {
        return entries
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
      fieldsToggleBoundaries: {
        date: null,
        description: true,
        duration: null,
        tags: null,
        user: false
      },
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
    }
  }
}

module.exports = PageDashboard
