import DatePicker from 'vue2-datepicker'
import {
  isMidnightUtc,
  isNull,
  // assert
} from '../../../lib/types'
import {
  classes
} from '../../../componentMixins'

const DateRange = {
  data () {
    const {
      dateRange
    } = this.$store.state.reportFilters

    return {
      localDateRange: [
        dateRange[0] ? new Date(dateRange[0]) : null,
        dateRange[1] ? new Date(dateRange[1]) : null,
      ]
    }
  },
  components: {
    DatePicker
  },
  methods: {
    inputDateRange () {
      const {
        localDateRange
      } = this

      this.localDateRange = localDateRange.map((date) => {
        if (isNull(date))
          return date
        if (isMidnightUtc(date))
          return date
        // for AWST getTimezoneOffset returns -480, that's 8hrs * -60 minutes
        return new Date(date.getTime() + date.getTimezoneOffset() * -60000)
      })
    },
    getValue () {
      return this.localDateRange.map((d) => d ? d.getTime() : null)
    }
  },
  mixins: [classes],
  props: {}
}

export default DateRange
