import { gql } from 'graphql-tag'
import {
  TagPartialQ
} from '../../apollo/queries'
import {
  TagUpdateM
} from '../../apollo/mutations'

const Tags = {
  apollo: {
    tags: {
      query: TagPartialQ,
      variables () {
        const {
          tagPartial
        } = this
        return {
          limit: 24,
          offset: 0,
          tagPartial
        }
      },
      update ({ TagPartialQ: { docs, hasMore } }) {
        this.hasMore = hasMore
        return docs
      },
    }
  },
  data () {
    return {
      tagPartial: ''
    }
  },
  methods: {
    async toggleArchived (tag) {
      const {
        id,
        name,
        archived
      } = tag
      await this.$apollo.mutate({
        mutation: TagUpdateM,
        variables: {
          tag: {
            id,
            name,
            archived: !archived
          }
        },
        update: (store, ctx) => {
          const {
            data: {
              TagUpdateM: updatedTag
            }
          } = ctx
          store.writeFragment({
            id: `Tag:${tag.id}`,
            fragment: gql`
              fragment UpdatedTag on Tag {
                id
                name
                archived
              }
            `,
            data: updatedTag
          })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          TagUpdateM: {
            __typename: 'Tag',
            ...tag,
            archived: !tag.archived
          }
        }
      })
    }
  }
}

export default Tags
