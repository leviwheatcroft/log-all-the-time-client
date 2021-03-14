const {
  IconClock,
} = require('../../../icons')
const {
  types: {
    isInteger,
    isEmptyString
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
      invalid
    }
  },
  methods: {
    invalidate () {
      this.invalid = true
      this.$el.querySelector('input').addEventListener(
        'input',
        // eslint-disable-next-line no-return-assign
        () => this.invalid = false,
        { once: true }
      )
    },
    blurDuration () {
      if (this.durationRaw.length === 0)
        return
      let duration
      try {
        duration = parseHumanDuration(this.durationRaw)
      } catch (err) {
        if (err.code === 'VALIDATION_ERROR')
          return this.invalidate()
        throw err
      }

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
    }
  }
}

module.exports = Duration
