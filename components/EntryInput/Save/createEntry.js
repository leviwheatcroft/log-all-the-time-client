import {
  EntryCreateM
} from '../../../apollo/mutations'
import {
  EntryFilterQ
} from '../../../apollo/queries'

export async function createEntry () {
  const {
    description,
    duration,
    date,
    project,
    tags,
    user
  } = this

  // clear fields for next input
  this.reset()

  const entry = {
    date,
    duration,
    description,
    project: {
      ...project.id ? { id: project.id } : {},
      name: project.name
    },
    // strip __typename (existing tags)
    // strip id: false (new tags)
    tags: tags.map((t) => ({
      ...t.id !== false ? { id: t.id } : {},
      name: t.name
    }))
  }

  let isOptimisticResponse = true

  await this.$apollo.mutate({
    mutation: EntryCreateM,
    variables: {
      entry
    },
    update: (store, ctx) => {
      const {
        data: {
          EntryCreateM: insertedEntry
        }
      } = ctx

      // update daySummaries
      // only for actual response not for optimisticResponse
      // we need actual response so we have the correct projectId
      if (!isOptimisticResponse)
        this.$store.commit('daySummaries/add', insertedEntry)

      // need to resolve hasMore for the EntryFilterQ response
      // in the unlikely case that EntryFilterQ has never been requested
      // store.readQuery will return null
      const cached = store.readQuery({
        query: EntryFilterQ,
        variables: {
          users: [user],
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
          users: [user],
          sort: { createdAt: 'desc' }
        },
        data: {
          EntryFilterQ: {
            __typename: 'Page',
            docs: [insertedEntry],
            hasMore
          }
        }
      })
      isOptimisticResponse = false
    },
    optimisticResponse: {
      __typename: 'Mutation',
      EntryCreateM: {
        __typename: 'Entry',
        ...entry,
        id: 'newId',
        user,
        createdAt: Date.now(),
        active: true,
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
}
