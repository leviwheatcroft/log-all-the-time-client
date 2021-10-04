
// import {
//   midnightUtcMs
// } from '../../../lib/dates'
import {
  assert
} from '../../../lib/types'
import {
  createEntry
} from './createEntry'
import {
  updateEntry
} from './updateEntry'

const Save = {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    createEntry,
    updateEntry,
    async clickSave () {
      try {
        this.validate()
      } catch (err) {
        if (err.code === 'VALIDATION_ERROR')
          return
        throw err
      }
      const {
        isNewEntry
      } = this
      this.$emit('submit')
      if (isNewEntry)
        await this.createEntry()
      else
        await this.updateEntry()
    }
  },
  props: {
    validate: {
      required: true,
      type: Function
    },
    id: {
      required: true,
      type: Number,
    },
    date: {
      required: true,
      validator (date) { return assert('isMidnightUtcMs', date) }
    },
    createdAt: {
      required: true,
      validator (date) { return assert('isDateMs', date) }
    },
    description: {
      required: true,
      type: String
    },
    duration: {
      required: true,
    },
    project: {
      required: true,
      validator (project) {
        return assert(['isFalse', 'isProject', 'isNewProject'], project)
      }
    },
    tags: {
      required: true,
      type: Array
    },
    isNewEntry: {
      required: true,
      type: Boolean
    },
    tabindex: {
      required: true
    },
    reset: {
      required: true,
      type: Function
    }
  }
}

export default Save
