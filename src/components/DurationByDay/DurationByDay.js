const {
  queries: {
    DurationByDayQ
  }
} = require('../../apollo')
const {
  reduce,
  state
} = require('../../store')
const {
  stringOps: {
    durationAsHHMM
  }
} = require('../../lib')

const DurationByDay = {
  // apollo: {
  //   durations: {
  //     query: DurationByDayQ,
  //     variables () {
  //       const dateTo = midnightUtc(new Date())
  //       const dateFrom = new Date(dateTo.valueOf() - (7 * dayMs))
  //       return { dateFrom, dateTo }
  //     },
  //     update ({ DurationByDayQ: durations }) { return durations }
  //   }
  // },
  async beforeMount () {
    this.fetchDurationsByDay()
  },
  data () {
    const {
      durationByDay
    } = state
    return {
      durationByDay
    }
  },
  computed: {
    loading () { return this.durationByDay.loading },
    dateFrom () { return this.durationByDay.dateFrom },
    dateTo () { return this.durationByDay.dateTo },
    days () { return this.durationByDay.days }
  },
  methods: {
    durationAsHHMM (duration) {
      return durationAsHHMM(duration)
    },
    async fetchDurationsByDay () {
      const {
        dateFrom,
        dateTo
      } = this
      reduce({
        DURATIONS_BY_DAY_LOADING: { loading: true }
      })
      const result = await this.$apollo.query({
        query: DurationByDayQ,
        variables: {
          dateFrom,
          dateTo
        }
      })
      const {
        data: {
          DurationByDayQ: days
        }
      } = result
      reduce({
        DURATIONS_BY_DAY_SET: { days },
        DURATIONS_BY_DAY_LOADING: { loading: false }
      })
    }
  }
}

module.exports = DurationByDay
