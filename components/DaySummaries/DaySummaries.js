
import {
  DaySummariesQ
} from '../../apollo/queries'
import {
  hexFromString
} from '../../lib/colors'
import {
  durationAsHHMM
} from '../../lib/stringOps'

const DaySummaries = {
  apollo: {
    daySummaries: {
      query: DaySummariesQ,
      variables () {
        const {
          dateFrom,
          dateTo
        } = this
        return {
          dateFrom,
          dateTo
        }
      },
      update ({ DaySummariesQ }) {
        this.$store.commit('daySummaries/set', DaySummariesQ)
        return DaySummariesQ
      }
    }
  },
  computed: {
    // isEmpty () {
    //   return Object.values(
    //     this.$store.state.daySummaries.daySummariesById
    //   ).every(({ dayDuration }) => dayDuration === 0)
    // },
    daySummariesById () {
      return this.$store.state.daySummaries.daySummariesById
    },
    dateFrom () { return this.$store.state.daySummaries.dateFrom },
    dateTo () { return this.$store.state.daySummaries.dateTo },
    dayCount () {
      return this.$store.state.daySummaries.dayCount
    }
  },
  methods: {
    hexFromString (str) {
      return hexFromString(str)
    },
    durationAsHHMM (duration) {
      return durationAsHHMM(duration)
    },
    clickDayCount (count) {
      this.$store.commit('daySummaries/dayCount', count)
    },
    clickPeriod (direction) {
      this.$store.commit('daySummaries/period', direction)
    }
  }
}

export default DaySummaries
