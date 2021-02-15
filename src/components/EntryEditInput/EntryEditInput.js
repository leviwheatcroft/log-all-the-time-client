const { scrapeDate } = require('./scrapeDate')
const { scrapeTag } = require('./scrapeTag')
const { scrapeTime } = require('./scrapeTime')
const { scrapeDuration } = require('./scrapeDuration')

const middlewares = [
  scrapeDate,
  scrapeTag,
  scrapeTime,
  scrapeDuration
]

const EntryEditProject = {
  data () {
    return {
      raw: ''
    }
  },
  methods: {
    change () {
      const {
        raw
      } = this.$data
      const entry = { raw }
      middlewares.forEach((m) => {
        try {
          m(entry)
        } catch (err) {
          if (m.code === 'VALIDATION_ERROR')
            console.log('validation error')
        }
      })
      this.$emit('update', entry)
    }
  }
}

module.exports = EntryEditProject
