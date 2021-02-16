const {
  mutations: {
    EntryNewM,
    EntryQ
  }
} = require('../../apollo')
const { scrapers }  =require('./scrapers')

const EntryNew = {
  data () {
    return {
      raw: '',
      entry: {}
    }
  },
  watch: {
    raw (raw) {
      const description = raw
      const entry = { raw, description }
      scrapers.forEach((s) => {
        try {
          s(entry)
        } catch (err) {
          if (err.code === 'VALIDATION_ERROR')
            console.log('validation error')
          else
            throw err
        }
      })
      this.$data.entry = entry
    }
  },
  methods: {
    async submit () {
      const {
        entry
      } = this.$data
      await this.$apollo.mutate({
        mutation: EntryNewM,
        variables: {
          entry
        },
        update: (store, { data: { EntryNewM } }) => {
          const data = store.readQuery({ query: EntryQ })

          data.EntryQ.push(EntryNewM)
          store.writeQuery({ query: EntryQ, data })
        }
      })
    }
  }
}

module.exports = EntryNew
