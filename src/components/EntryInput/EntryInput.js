const { default: DatePicker } = require('vue2-datepicker')
const gql = require('graphql-tag')
const { default: Delete } = require('./Delete')
const { default: Duration } = require('./Duration')
const {
  IconCalendar,
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
    EntryUpsertM
  },
  queries: {
    EntryFilterQ
  }
} = require('../../apollo')
const {
  errors: {
    ValidationError
  },
  enums: {
    ValidState
  },
  dates: {
    midnightUtc
  },
  types: {
    isEntry,
    isTag,
    isNewTag
  }
} = require('../../lib')
const {
  reduce
} = require('../../store')

const EntryInput = {
  components: {
    DatePicker,
    Delete,
    Duration,
    IconCalendar,
    IconEdit3,
    IconSend,
    IconTrash2,
    IconX,
    TagSelector
  },
  data () {
    const descriptionValidState = ValidState.unchecked
    const durationValidState = ValidState.unchecked
    const isNewEntry = !this.entry
    const tabindex = this.idx * 5
    const {
      date = Date.now(),
      description,
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
    blurSave () {
      this.$el.querySelector('input.description').focus()
    },
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
    async clickSubmit () {
      const {
        date,
        description,
        duration,
        id,
        tags,
        isNewEntry
      } = this

      try {
        this.validate()
      } catch (err) {
        if (err.code === 'VALIDATION_ERROR')
          return
        throw err
      }

      // update durationsByDay
      reduce({
        ...!isNewEntry ? {
          DURATIONS_BY_DAY_REMOVE: {
            date: new Date(this.entry.date),
            duration: this.entry.duration
          }
        } : {},
        DURATIONS_BY_DAY_ADD: {
          date: midnightUtc(date),
          duration
        }
      })

      // prep inputs ready for the user to input another entry
      if (isNewEntry) {
        // this.date = new Date()
        this.duration = ''
        this.description = ''
        this.tags = []
        this.$el.querySelector('input.duration').focus()
      }

      const entry = {
        ...id ? { id } : {},
        date: midnightUtc(date),
        duration,
        description,

        // strip __typename (existing tags)
        // strip id: false (new tags)
        tags: tags.map((t) => ({
          ...t.id !== false ? { id: t.id } : {},
          tagName: t.tagName
        }))
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
              EntryUpsertM: upsertedEntry
            }
          } = ctx

          if (isNewEntry) {
            // writeQuery will be intercepted by the EnterFilterQ typePolicy
            // which will determine how to include the new entry in the cached
            // results for EntryFilterQ
            store.writeQuery({
              query: EntryFilterQ,
              variables: {
                self: true,
                sort: { createdAt: 'desc' }
              },
              data: {
                EntryFilterQ: {
                  __typename: 'Page',
                  docs: [upsertedEntry]
                }
              }
            })
          } else {
            // writeFragment would be intercepted by a typePolicy, but no
            // typePolicy exists for Entry.
            // https://www.apollographql.com/docs/react/caching/cache-interaction/#writequery-and-writefragment
            store.writeFragment({
              id: `Entry:${entry.id}`,
              fragment: gql`
                fragment UpsertedEntry on Entry {
                  date
                  duration
                  description
                  tags
                }
              `,
              data: upsertedEntry
            })
          }
        },
        optimisticResponse: {
          __typename: 'Mutation',
          EntryUpsertM: {
            __typename: 'Entry',
            id: 'newId',
            createdAt: Date.now(),
            // id & createdAt will be overwritten if they exist on entry
            ...entry,
            // date & tags below will overwrite the values on entry
            date: entry.date.valueOf(),
            tags: entry.tags.map((tag) => ({
              __typename: 'Tag',
              ...tag.id ? {} : { id: 'newId' },
              ...tag
            }))
          }
        }
      })
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
