const {
  mutations: {
    EntryUpdateM
  },
  queries: {
    EntryQ
  }
} = require('../../apollo')

const { resolvers: { resolve } } = require('../../lib')

const EntryEdit = {
  data () {
    return {
      raw: this.entry.raw
    }
  },
  props: [
    'entry'
  ],
  methods: {
    async submit () {
      const entry = resolve({
        id: this.entry.id,
        date: null,
        timeStart: null,
        timeEnd: null,
        duration: null,
        tags: [],
        raw: this.$data.raw,
        description: this.$data.raw
      })
      this.$emit('unedit')
      await this.$apollo.mutate({
        mutation: EntryUpdateM,
        variables: {
          entry
        },
        update: (store, ctx) => {
          const {
            data: {
              EntryUpdateM: result
            }
          } = ctx

          const data = store.readQuery({ query: EntryQ })
          const idx = data.EntryQ.findIndex((c) => c.id === result.id)
          this.$set(data.EntryQ, idx, result)

          store.writeQuery({ query: EntryQ, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          EntryUpdateM: {
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

module.exports = EntryEdit
