import { gql } from 'graphql-tag'
import {
  EntryDeleteM
} from '../../../apollo/mutations'
import {
  assert
} from '../../../lib/types'

const Delete = {
  methods: {
    async clickDelete () {
      const {
        id,
        date,
        duration
      } = this.entry

      // update durationsByDay
      this.$store.commit('durationsByDay/remove', {
        date: new Date(date),
        duration
      })

      await this.$apollo.mutate({
        mutation: EntryDeleteM,
        variables: {
          id
        },
        update (store) {
          store.writeFragment({
            id: `Entry:${id}`,
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
            ...this.entry,
            deleted: true
          }
        }
      })
    }
  },
  props: {
    entry: {
      required: true,
      validator (entry) { return assert('isEntry', entry) }
    }
  }
}

export default Delete
