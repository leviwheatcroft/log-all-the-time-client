const {
  mutations: {
    EntryAddM
  },
  queries: {
    EntryQ
  }
} = require('../../apollo')

const { resolvers: { resolve } } = require('../../lib')

const EntryNew = {
  data () {
    return {
      raw: ''
    }
  },
  methods: {
    async submit () {
      const entry = resolve({
        date: null,
        timeStart: null,
        timeEnd: null,
        duration: null,
        tags: [],
        raw: this.$data.raw,
        description: this.$data.raw
      })
      await this.$apollo.mutate({
        mutation: EntryAddM,
        variables: {
          entry
        },
        update: (store, ctx) => {
          const {
            data: {
              EntryAddM: result
            }
          } = ctx

          const data = store.readQuery({ query: EntryQ })
          data.EntryQ.unshift(result)
          store.writeQuery({ query: EntryQ, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          EntryAddM: {
            id: -1,
            __typename: 'Entry',
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

module.exports = EntryNew
