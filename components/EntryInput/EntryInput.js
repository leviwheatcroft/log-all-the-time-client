
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
      project = false,
      user = false
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
    // tagNewHandler (tag) {
    //   tag.name = tag.itemName
    //   assert('isTag', tag)
    //   this.tags.push(tag)
    // },
    // tagAddHandler (tag) {
    //   assert('isTag', tag)
    //   this.tags.push(tag)
    // },
    // tagRemoveHandler (tag) {
    //   assert(['isTag', 'isNewTag'], tag)
    //   const idx = this.tags.findIndex((t) => t.name === tag.name)
    //   console.assert(
    //     idx !== -1,
    //     { tags: this.tags, tag, msg: 'tag not in tags' }
    //   )
    //   this.tags.splice(idx, 1)
    // },
    // projectNewHandler (project) {
    //   project.name = project.itemName
    //   this.project = assert('isNewProject', project)
    // },
    // projectAddHandler (project) {
    //   this.project = assert('isNewProject', project)
    // },
    // projectRemoveHandler () {
    //   this.project = false
    // },
    // userAddHandler (user) {
    //   assert('isUser', user)
    //   this.user = user
    // },
    // userRemoveHandler () {
    //   this.user = false
    // },
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
      this.project = false
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
