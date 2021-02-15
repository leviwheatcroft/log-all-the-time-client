const {
  mutations: {
    EntryNewM,
    EntryQ
  }
} = require('../../../apollo')

const Submit = {
  methods: {
    async submit () {
      const {
        entry
      } = this.$parent.$data
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

module.exports = Submit
