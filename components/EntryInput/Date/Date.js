import DatePicker from 'vue2-datepicker'
import {
  assert
} from '../../../lib/types'
import {
  isMidnightUtc
} from '../../../lib/types/isMidnightUtc'
import {
  classes
} from '../../../componentMixins'

const Description = {
  data () {
    return {
      localDate: new Date(this.date)
    }
  },
  components: {
    DatePicker
  },
  methods: {
    inputDate () {
      let {
        localDate
      } = this
      // for AWST getTimezoneOffset returns -480, that's 8hrs * -60 minutes
      if (!isMidnightUtc(localDate)) {
        localDate = new Date(
          localDate.getTime() + localDate.getTimezoneOffset() * -60000
        )
      }
      this.$emit('input', localDate.getTime())
    }
  },
  mixins: [classes],
  props: {
    inputTabindex: {
      required: true,
      type: Number
    },
    date: {
      required: true,
      validator (date) { return assert('isMidnightUtcMs', date) }
    }
  }
}

export default Description
