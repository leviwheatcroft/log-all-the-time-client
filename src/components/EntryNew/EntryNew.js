const {
  mutations: {
    EntryNewM,
    EntryQ
  }
} = require('../../apollo')
const { scrapeDate } = require('./scrapeDate')
const { scrapeTags } = require('./scrapeTags')
const { scrapeTime } = require('./scrapeTime')
const { scrapeDuration } = require('./scrapeDuration')

const middlewares = [
  scrapeDate,
  scrapeDuration,
  scrapeTags,
  scrapeTime
]

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
      middlewares.forEach((m) => {
        try {
          m(entry)
        } catch (err) {
          if (m.code === 'VALIDATION_ERROR')
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
