import { gql } from 'graphql-tag'
import {
  EntryCreateM
} from '../../../apollo/mutations'
import {
  EntryFilterQ
} from '../../../apollo/queries'
import {
  midnightUtc
} from '../../../lib/dates'
import {
  validator
} from '../../../lib/types'

const Save = {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    async clickSave () {
      const {
        date,
        description,
        duration,
        id,
        project,
        tags,
        isNewEntry,
        user
      } = this

      try {
        this.validate()
      } catch (err) {
        if (err.code === 'VALIDATION_ERROR')
          return
        throw err
      }

      // this.$store.commit('durationsByDay/remove', {
      //   date: new Date(date),
      //   duration
      // })
      // this.$store.commit('durationsByDay/add', {
      //   date: midnightUtc(date),
      //   duration
      // })

      if (isNewEntry)
        this.reset()

      const entry = {
        ...id ? { id } : {},
        active: true,
        date: midnightUtc(date),
        duration,
        description,
        project: {
          ...project.id ? { id: project.id } : {},
          projectName: project.projectName
        },
        // strip __typename (existing tags)
        // strip id: false (new tags)
        tags: tags.map((t) => ({
          ...t.id !== false ? { id: t.id } : {},
          tagName: t.tagName
        }))
      }

      this.$emit('submit')

      await this.$apollo.mutate({
        mutation: EntryCreateM,
        variables: {
          entry
        },
        update: (store, ctx) => {
          const {
            data: {
              EntryCreateM: upsertedEntry
            }
          } = ctx

          if (isNewEntry) {
            // we need to resolve hasMore for the EntryFilterQ response
            // in the unlikely case that EntryFilterQ has never been requested
            // store.readQuery will return null
            const cached = store.readQuery({
              query: EntryFilterQ,
              variables: {
                self: true,
                sort: { createdAt: 'desc' }
              }
            })
            let hasMore
            if (cached === null)
              hasMore = false
            else
              hasMore = cached.EntryFilterQ.hasMore

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
                  docs: [upsertedEntry],
                  hasMore
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
                  project
                  tags
                }
              `,
              data: upsertedEntry
            })
          }
        },
        optimisticResponse: {
          __typename: 'Mutation',
          EntryCreateM: {
            __typename: 'Entry',
            id: 'newId',
            user,
            createdAt: Date.now(),
            // id & createdAt will be overwritten if they exist on entry
            ...entry,
            active: true,
            // date, tags & project below will overwrite the values on entry
            date: entry.date.valueOf(),
            tags: entry.tags.map((tag) => ({
              __typename: 'Tag',
              ...tag.id ? {} : { id: 'newId' },
              ...tag
            })),
            project: {
              __typename: 'Project',
              ...project.id ? {} : { id: 'newId' },
              ...project
            }
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
    project: {
      required: true,
      validator (project) {
        return validator(['isFalse', 'isProject', 'isNewProject'], project)
      }
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
