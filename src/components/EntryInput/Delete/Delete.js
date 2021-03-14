const gql = require('graphql-tag')
const {
  IconTrash2,
} = require('../../../icons')
const {
  mutations: {
    EntryDeleteM
  }
} = require('../../../apollo')
const {
  reduce
} = require('../../../store')
const {
  types: {
    isEntry,
  }
} = require('../../../lib')

const Delete = {
  components: {
    IconTrash2
  },
  methods: {
    async clickDelete () {
      const {
        id,
        date,
        duration
      } = this.entry

      // update durationsByDay
      reduce({
        DURATIONS_BY_DAY_REMOVE: { date: new Date(date), duration }
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
      validator (entry) {
        console.assert(isEntry(entry), { entry, message: 'entry is not entry' })
        return true
      }
    }
  }
}

module.exports = Delete
