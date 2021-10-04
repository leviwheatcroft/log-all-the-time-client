
import {
  midnightUtcMs
} from '../../lib/dates'
// TODO: these isX type checks are deprecated
import {
  assert,
  isTag,
  isNewTag,
  isProject,
  isNewProject
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
    projectNewHandler (project) {
      project.projectName = project.itemName
      console.assert(
        isNewProject(project),
        { project, msg: 'project is not newProject' }
      )
      this.project = project
    },
    projectAddHandler (project) {
      console.assert(
        isProject(project),
        { project, msg: 'project is not project' }
      )
      this.project = project
    },
    projectRemoveHandler () {
      this.project = false
    },
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
