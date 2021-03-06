const { default: DatePicker } = require('vue2-datepicker')
const {
  IconCalendar,
  IconClock,
  IconEdit3,
  IconSend,
  IconTrash2,
  IconX
} = require('../../icons')

const {
  TagSelector
} = require('../selectors')
const {
  mutations: {
    EntryUpsertM,
    EntryDeleteM
  },
  queries: {
    EntryQ
  }
} = require('../../apollo')
const {
  dates: {
    midnightUtc
  },
  types: {
    isEntry,
    isTag,
    isNewTag
  },
  stringOps: {
    parseHumanDuration,
    durationAsHHMM,
    durationFromHHMM
  }
} = require('../../lib')
const {
  reduce
} = require('../../store')

const EntryInput = {
  components: {
    DatePicker,
    IconCalendar,
    IconClock,
    IconEdit3,
    IconSend,
    IconTrash2,
    IconX,
    TagSelector
  },
  data () {
    if (this.entry) {
      const {
        id,
        date,
        duration,
        description,
        tags
      } = this.entry
      return {
        id,
        date: new Date(date),
        duration: durationAsHHMM(duration),
        description,
        tags
      }
    }
    return {
      id: '',
      date: new Date(),
      duration: '',
      description: '',
      tags: []
    }
  },
  methods: {
    blurDuration () {
      if (this.duration.length === 0)
        return
      this.duration = durationAsHHMM(parseHumanDuration(this.duration))
    },
    tagNewHandler (tag) {
      tag.tagName = tag.itemName
      if (!isNewTag(tag))
        throw new TypeError('tag is not newTag')
      this.tags.push(tag)
    },
    tagAddHandler (tag) {
      if (!isTag(tag))
        throw new TypeError('tag is not tag')
      this.tags.push(tag)
    },
    tagRemoveHandler (tag) {
      if (!isTag(tag) && !isNewTag(tag))
        throw new TypeError('tag is not tag or newTag')
      const idx = this.tags.findIndex((t) => t.tagName === tag.tagName)
      if (idx === -1)
        throw new RangeError('tag not in tags')
      this.tags.splice(idx, 1)
    },
    clickCancel () {
      this.$emit('cancel')
    },
    async clickDelete () {
      const {
        entry
      } = this
      const {
        id
      } = entry

      // update durationsByDay
      reduce({
        DURATIONS_BY_DAY_REMOVE: {
          date: new Date(this.entry.date),
          duration: this.entry.duration
        }
      })
      this.$emit('delete')
      await this.$apollo.mutate({
        mutation: EntryDeleteM,
        variables: {
          id
        },
        update (store) {
          const data = store.readQuery({ query: EntryQ })
          const idx = data.EntryQ.findIndex((e) => e.id === id)
          if (idx === -1)
            throw new RangeError('deleted non existant entry?')
          data.EntryQ.splice(idx, 1)
          store.writeQuery({ query: EntryQ, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          EntryDeleteM: {
            ...entry,
            deleted: true
          }
        }
      })
    },
    async clickSubmit () {
      const {
        id,
        date,
        duration,
        description,
        tags
      } = this

      // update durationsByDay
      reduce({
        ...this.entry ? {
          DURATIONS_BY_DAY_REMOVE: {
            date: new Date(this.entry.date),
            duration: this.entry.duration
          }
        } : {},
        DURATIONS_BY_DAY_ADD: {
          date: midnightUtc(date),
          duration: durationFromHHMM(duration)
        }
      })

      // clear local entry
      if (!this.entry) {
        this.date = new Date()
        this.duration = ''
        this.description = ''
        this.tags = []
      }

      const entry = {
        ...id ? { id } : {},
        date: midnightUtc(date),
        duration: durationFromHHMM(duration),
        description,

        // strip __typename
        tags: tags.map((t) => ({ id: t.id, tagName: t.tagName }))
      }
      this.$el.querySelector('input.duration').focus()
      this.$emit('submit')
      await this.$apollo.mutate({
        mutation: EntryUpsertM,
        variables: {
          entry
        },
        update: (store, ctx) => {
          const {
            data: {
              EntryUpsertM: result
            }
          } = ctx

          const data = store.readQuery({ query: EntryQ })
          const idx = data.EntryQ.findIndex((c) => c.id === result.id)
          if (idx !== -1)
            data.EntryQ.splice(idx, 1, result)
          else
            data.EntryQ.unshift(result)

          // this clears out any optimistic responses without considering
          // which response we actually have. Only an issue if there's more
          // than one EntryUpsertM in flight
          data.EntryQ = data.EntryQ.filter((e) => e.id !== 'newId')

          store.writeQuery({ query: EntryQ, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          EntryUpsertM: {
            __typename: 'Entry',
            ...entry.id ? {} : { id: 'newId' },
            ...entry,
            tags: entry.tags.map((tag) => ({
              __typename: 'Tag',
              ...tag.id ? {} : { id: 'newId' },
              ...tag
            }))
          }
        }
      })
    }
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
    }
  }
}

module.exports = EntryInput
