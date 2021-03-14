const { default: DatePicker } = require('vue2-datepicker')
const { default: Delete } = require('./Delete')
const { default: Duration } = require('./Duration')
const { default: Save } = require('./Save')
const {
  IconCalendar,
  IconEdit3,
  IconTrash2,
  IconX
} = require('../../icons')
const {
  TagSelector
} = require('../selectors')
const {
  errors: {
    ValidationError
  },
  enums: {
    ValidState
  },
  types: {
    isEntry,
    isTag,
    isNewTag
  }
} = require('../../lib')

const EntryInput = {
  components: {
    DatePicker,
    Delete,
    Duration,
    IconCalendar,
    IconEdit3,
    IconTrash2,
    IconX,
    TagSelector,
    Save
  },
  data () {
    const descriptionValidState = ValidState.unchecked
    const durationValidState = ValidState.unchecked
    const isNewEntry = !this.entry
    const tabindex = this.idx * 5
    const {
      date = Date.now(),
      description = '',
      duration = '',
      id = '',
      tags = [],
    } = this.entry || {}

    return {
      date: new Date(date),
      description,
      descriptionValidState,
      duration,
      durationValidState,
      id,
      isNewEntry,
      tabindex,
      tags,
    }
  },
  methods: {
    tagNewHandler (tag) {
      tag.tagName = tag.itemName
      console.assert(
        isNewTag(tag),
        { tag, msg: 'tag is not newTag' }
      )
      this.tags.push(tag)
    },
    tagAddHandler (tag) {
      console.assert(
        isTag(tag),
        { tag, msg: 'tag is not tag' }
      )
      this.tags.push(tag)
    },
    tagRemoveHandler (tag) {
      console.assert(
        isTag(tag) || isNewTag(tag),
        { tag, msg: 'tag is not tag or newTag' }
      )
      const idx = this.tags.findIndex((t) => t.tagName === tag.tagName)
      console.assert(
        idx !== -1,
        { tags: this.tags, tag, msg: 'tag not in tags' }
      )
      this.tags.splice(idx, 1)
    },
    checkValidState ({ target }) {
      if (target.classList.contains('description')) {
        const {
          description
        } = this
        if (description.length < 3)
          this.descriptionValidState = ValidState.invalid
        else
          this.descriptionValidState = ValidState.valid
      }
    },
    clickCancel () {
      this.$emit('cancel')
    },
    validate () {
      const {
        descriptionValidState,
        durationValidState
      } = this

      if (descriptionValidState === ValidState.unchecked)
        this.descriptionValidState = ValidState.invalid

      if (durationValidState === ValidState.unchecked)
        this.durationValidState = ValidState.invalid

      if (
        descriptionValidState !== ValidState.valid ||
        durationValidState !== ValidState.valid
      )
        throw new ValidationError()
    },
    reset () {
      // this.date = new Date()
      this.duration = ''
      this.description = ''
      this.tags = []
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
      validator (entry) {
        if (!entry)
          return
        return isEntry(entry)
      }
    },
    idx: {
      required: false,
      type: Number,
      default: 0
    }
  }
}

module.exports = EntryInput
