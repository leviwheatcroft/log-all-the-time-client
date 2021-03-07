const check = require('check-types')
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
    isMidnightUtc
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
      check.assert.containsKey(tag, 'id')
      check.assert.containsKey(tag, 'tagName')
      reduce({
        FILTER_TAGS_APPEND: { tag }
      })
      this.$router.push('/report')
    },
    clickDateHandler (date) {
      check.assert.date(date)
      if (!isMidnightUtc(date))
        throw new RangeError('date is not midnightUtc')
      reduce({
        FILTER_DATE_FROM: { dateFrom: date },
        FILTER_DATE_TO: { dateTo: date }
      })
      this.$router.push('/report')
    }
  }
}

module.exports = PageDashboard
