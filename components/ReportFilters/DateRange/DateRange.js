import DatePicker from 'vue2-datepicker'
import {
  classes
} from '../../../componentMixins'

// for AWST getTimezoneOffset returns -480, that's 8hrs * -60 minutes
const timezoneOffset = (new Date()).getTimezoneOffset() * -60000

const DateRange = {
  data () {
    return {
      localDateRange: [...this.dateRange]
    }
  },
  components: {
    DatePicker
  },
  methods: {
    inputDateRange () {
      const {
        localDateRange: [dateFrom, dateTo]
      } = this

      this.$emit(
        'updateDateRange',
        [
          dateFrom ? dateFrom + timezoneOffset : null,
          dateTo ? dateTo + timezoneOffset : null
        ]
      )

      // this.localDateRange = localDateRange.map((date) => {
      //   if (isNull(date))
      //     return date
      //   if (isMidnightUtc(date))
      //     return date
      //   // for AWST getTimezoneOffset returns -480, that's 8hrs * -60 minutes
      //   return new Date(date.getTime() + date.getTimezoneOffset() * -60000)
      // })
    }
  },
  mixins: [classes],
  props: {
    dateRange: {
      type: Array,
      validator (dateRange) {
        return (
          dateRange.length === 2 &&
          dateRange.every((d) => (
            d === null ||
            (
              Number.isInteger(d) &&
              d % 86400000 === 0
            )
          ))
        )
      }
    }
  }
}

export default DateRange
