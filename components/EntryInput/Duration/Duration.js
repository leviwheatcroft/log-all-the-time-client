import {
  ValidState
} from '../../../lib/enums'
import {
  getValidator
} from '../../../lib/types'
import {
  parseHumanDuration,
  durationAsHHMM
} from '../../../lib/stringOps'
import {
  classes
} from '../../../componentMixins'

const Duration = {
  data () {
    const durationRaw = this.duration ? durationAsHHMM(this.duration) : ''
    const validState = ValidState.unchecked
    return {
      durationRaw,
      validState,
    }
  },
  methods: {
    blurDuration () {
      if (this.durationRaw.length === 0)
        return
      let duration
      try {
        duration = parseHumanDuration(this.durationRaw)
      } catch (err) {
        if (err.code === 'VALIDATION_ERROR')
          this.validState = ValidState.invalid
        else
          throw err
      }

      this.durationRaw = durationAsHHMM(duration)

      this.$emit('change', duration)
    },
    validate () {
      if (this.validState === ValidState.unchecked) {
        try {
          parseHumanDuration(this.durationRaw)
          this.validState = ValidState.valid
        } catch (err) {
          if (err.code === 'VALIDATION_ERROR')
            this.validState = ValidState.invalid
          else
            throw err
        }
      }
      return this.validState
    }
  },
  mixins: [classes],
  props: {
    duration: {
      required: true,
      validator: getValidator(['isInteger', 'isEmptyString'])
    },
    tabindex: {
      required: true
    }
  }
}

export default Duration
