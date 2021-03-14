const {
  IconClock,
} = require('../../../icons')
const {
  enums: {
    ValidState
  },
  types: {
    isInteger,
    isEmptyString,
    isValidState,
  },
  stringOps: {
    parseHumanDuration,
    durationAsHHMM
  }
} = require('../../../lib')

const Duration = {
  components: {
    IconClock
  },
  data () {
    const durationRaw = this.duration ? durationAsHHMM(this.duration) : ''
    const invalid = false
    return {
      durationRaw,
      invalid,
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
          return this.$emit('validState', ValidState.invalid)
        throw err
      }

      this.$emit('validState', ValidState.valid)

      this.durationRaw = durationAsHHMM(duration)

      this.$emit('change', duration)
    },
  },
  props: {
    duration: {
      required: true,
      validator (duration) {
        console.assert(
          isInteger(duration) || isEmptyString(duration),
          { duration, message: 'duration !isInteger && !isEmptyString' }
        )
        return true
      }
    },
    tabindex: {
      required: true
    },
    validState: {
      required: true,
      validator (validState) {
        console.assert(
          isValidState(validState),
          { validState, msg: 'validState is !ValidState' }
        )
        return true
      }
    }
  }
}

module.exports = Duration
