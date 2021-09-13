import { gql } from 'graphql-tag'
import {
  EntryUpsertM
} from '../../../apollo/mutations'
import {
  EntryFilterQ
} from '../../../apollo/queries'
import {
  midnightUtc
} from '../../../lib/dates'

const Save = {
  methods: {
    async clickSave () {
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

      this.$store.commit('durationsByDay/remove', {
        date: new Date(this.entry.date),
        duration: this.entry.duration
      })
      this.$store.commit('durationsByDay/add', {
        date: midnightUtc(date),
        duration
      })

      if (isNewEntry)
        this.reset()

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
  },
  props: {
    validate: {
      required: true,
      type: Function
    },
    date: {
      required: true,
      type: Date
    },
    description: {
      required: true,
      type: String
    },
    duration: {
      required: true,
    },
    tags: {
      required: true,
      type: Array
    },
    entry: {
      required: false,
      type: Object
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
