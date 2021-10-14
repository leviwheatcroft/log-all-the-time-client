
import {
  midnightUtcMs
} from '../../lib/dates'
// TODO: these isX type checks are deprecated
import {
  assert
} from '../../lib/types'
import {
  ValidationError
} from '../../lib/errors'
import {
  ValidState
} from '../../lib/enums'

const EntryInput = {
  data () {
    const isNewEntry = !this.entry
    const tabindex = this.idx * 5
    const {
      date = midnightUtcMs(Date.now()),
      createdAt = Date.now(),
      description = '',
      duration = '',
      id = 0,
      tags = [],
      project = null,
      user = this.$store.state.user
    } = this.entry || {}

    return {
      date,
      createdAt,
      description,
      duration,
      project,
      id,
      isNewEntry,
      tabindex,
      tags,
      user
    }
  },
  methods: {
    clickCancel () {
      this.$emit('cancel')
    },
    validate () {
      const isValid = [
        this.$refs.description,
        this.$refs.duration
      ].every((validateItem) => {
        return validateItem.validate() === ValidState.valid
      })
      if (!isValid)
        throw new ValidationError()
    },
    reset () {
      // this.date = new Date()
      this.duration = ''
      this.description = ''
      this.tags = []
      this.project = null
      this.user = null
      this.$el.querySelector('input.description').focus()
    }
  },
  mounted () {
    // editing an existing entry should focus the input, but the input box
    // at the top for new entries should not focus on mount
    if (this.isNewEntry)
      return
    this.$el.querySelector('input.description').focus()
  },
  props: {
    allowSetUser: {
      required: false,
      default: false,
      type: Boolean
    },
    cancelable: {
      required: false,
      default: false,
      type: Boolean
    },
    deletable: {
      required: false,
      default: false,
      type: Boolean
    },
    entry: {
      required: false,
      type: Object,
      validator (entry) { return assert('isEntry', entry) }
    },
    idx: {
      required: false,
      type: Number,
      default: 0
    }
  }
}

export default EntryInput
