const { default: DatePicker } = require('vue2-datepicker')
const { default: TagSelector } = require('../TagSelector')
const {
  mutations: {
    EntryUpsertM
  },
  queries: {
    EntryQ
  }
} = require('../../apollo')
const {
  types: {
    isEntry,
    isTag
  }
} = require('../../lib')

const EntryInput = {
  components: {
    TagSelector,
    DatePicker
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
        duration,
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
  props: {
    cancelable: {
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
  },
  methods: {
    blurDuration (duration) {
      parseDuration(duration)
    },
    tagAddHandler (tag) {
      if (!isTag(tag))
        throw new TypeError('tag is not tag')
      this.tags.push(tag)
    },
    tagRemoveHandler (tag) {
      if (!isTag(tag))
        throw new TypeError('tag is not tag')
      const idx = this.tags.findIndex((t) => t.id === tag.id)
      if (idx === -1)
        throw new RangeError('tag not in tags')
      this.tags.splice(idx, 1)
    },
    clickCancel () {
      this.$emit('cancel')
    },
    async clickSubmit () {
      const {
        id,
        date,
        duration,
        description,
        tags
      } = this

      // clear local entry
      if (!this.entry) {
        this.date = new Date()
        this.duration = ''
        this.description = ''
        this.tags = []
      }

      const entry = {
        ...id ? { id } : {},
        date,
        duration: parseInt(duration, 10) || 0,
        description,
        tags
      }
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
            data.EntryQ.push(result)

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
              id: -1,
              tag
            }))
          }
        }
      })
    }
  }
}

module.exports = EntryInput
