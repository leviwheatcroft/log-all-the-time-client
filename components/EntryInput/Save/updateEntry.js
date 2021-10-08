import { gql } from 'graphql-tag'
import {
  EntryUpdateM
} from '../../../apollo/mutations'

export async function updateEntry () {
  const {
    description,
    duration,
    date,
    id,
    project,
    tags,
    createdAt,
    user
  } = this

  const entry = {
    id,
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

  // let isOptimisticResponse = true

  await this.$apollo.mutate({
    mutation: EntryUpdateM,
    variables: {
      entry
    },
    update: (store, ctx) => {
      const {
        data: {
          EntryUpdateM: updatedEntry
        }
      } = ctx

      // update daySummaries
      // only for optimisticResponse, not for actual response
      // TODO:
      // - find a way to avoid doing this for actual response
      // - need to know original duration so it can be removed
      // this.$store.commit('daySummaries/add', upsertedEntry)

      // writeFragment would be intercepted by a typePolicy, but no
      // typePolicy exists for Entry.
      // https://www.apollographql.com/docs/react/caching/cache-interaction/#writequery-and-writefragment
      store.writeFragment({
        id: `Entry:${entry.id}`,
        fragment: gql`
          fragment UpdatedEntry on Entry {
            id
            date
            duration
            description
            project
            tags
            createdAt
            user
          }
        `,
        data: updatedEntry
      })
    },
    optimisticResponse: {
      __typename: 'Mutation',
      EntryUpdateM: {
        __typename: 'Entry',
        ...entry,
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
        },
        createdAt: createdAt.valueOf(),
        user
      }
    }
  })
}
