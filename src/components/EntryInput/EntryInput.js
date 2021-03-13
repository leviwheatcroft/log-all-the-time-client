const { default: DatePicker } = require('vue2-datepicker')
const gql = require('graphql-tag')
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
    EntryFilterQ
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
      duration: duration ? durationAsHHMM(duration) : '',
      id,
      isNewEntry,
      tabindex,
      tags,
    }
    //
    // if (isNewEntry) {
    //   const {
    //     id,
    //     date,
    //     duration,
    //     description,
    //     tags,
    //     idx
    //   } = this.entry
    //   return {
    //     id,
    //     date: new Date(date),
    //     duration: durationAsHHMM(duration),
    //     description,
    //     tags,
    //     tabindex: idx * 5,
    //     isNewEntry,
    //   }
    // }
    // return {
    //   id: '',
    //   date: new Date(),
    //   duration: '',
    //   description: '',
    //   tags: [],
    //   isNewEntry: !this.entry,
    //   tabindex: idx * 5
    // }
  },
  methods: {
    blurSave () {
      this.$el.querySelector('input.description').focus()
    },
    blurDuration () {
      if (this.duration.length === 0)
        return
      this.duration = durationAsHHMM(parseHumanDuration(this.duration))
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
          store.writeFragment({
            id: `Entry:${entry.id}`,
            fragment: gql`
              fragment MyEntry on Entry {
                deleted
              }
            `,
            data: {
              deleted: true
            }
          })
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
        date,
        description,
        duration,
        id,
        tags,
        isNewEntry
      } = this

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
          duration: durationFromHHMM(duration)
        }
      })

      // prep inputs ready for the user to input another entry
      if (isNewEntry) {
        this.date = new Date()
        this.duration = ''
        this.description = ''
        this.tags = []
        this.$el.querySelector('input.duration').focus()
      }

      const entry = {
        ...id ? { id } : {},
        date: midnightUtc(date),
        duration: durationFromHHMM(duration),
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
