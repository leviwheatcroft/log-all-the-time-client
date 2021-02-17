const {
  mutations: {
    EntryUpsertM
  },
  queries: {
    EntryQ
  }
} = require('../../apollo')

const { resolvers } = require('../../lib')

const EntryNew = {
  data () {
    const entry = this.entry || { raw: '' }
    const localEntry = Object.fromEntries(
      Object.entries(entry).filter(([k]) => k !== '__typename')
    )
    return {
      localEntry,
      raw: localEntry.raw
    }
  },
  props: [
    'entry'
  ],
  watch: {
    raw (raw) {
      const {
        localEntry
      } = this.$data
      localEntry.description = raw
      localEntry.raw = raw

      resolvers.forEach((s) => {
        try {
          s(localEntry)
        } catch (err) {
          if (err.code === 'VALIDATION_ERROR')
            console.log('validation error')
          else
            throw err
        }
      })
      this.$data.localEntry = localEntry
    }
  },
  methods: {
    async submit () {
      const localEntry = {
        date: null,
        timeStart: null,
        timeEnd: null,
        duration: null,
        tags: [],
        ...this.$data.localEntry
      }
      this.$emit('unedit')
      await this.$apollo.mutate({
        mutation: EntryUpsertM,
        variables: {
          entry: localEntry
        },
        update: (store, { data }) => {
          const {
            EntryUpsertM: result
          } = data

          const cache = store.readQuery({ query: EntryQ })
          const idx = cache.EntryQ.findIndex((c) => c.id === result.id)
          if (idx !== -1)
            this.$set(cache.EntryQ, idx, result)
          else
            cache.EntryQ.unshift(result)

          store.writeQuery({ query: EntryQ, data: cache })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          EntryUpsertM: {
            ...localEntry,
            __typename: 'Entry',
            id: -1,
            tags: localEntry.tags.map((tag) => ({
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
