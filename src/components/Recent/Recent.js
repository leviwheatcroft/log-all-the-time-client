// const { default: EntryDisplay } = require('../EntryDisplay')
// const { default: EntryEdit } = require('../EntryEdit')
const { default: EntryListItem } = require('../EntryListItem')
const { reduce } = require('../../store')

const {
  queries: {
    EntryQ
  }
} = require('../../apollo')

const Recent = {
  data () {
    return {
      entries: [],
      editing: false
    }
  },
  apollo: {
    entries: {
      query: EntryQ,
      update ({ EntryQ: entries }) {
        return entries
      }
    }
  },
  components: {
    EntryListItem
  },
  methods: {
    clickTag (tagName) {
      reduce({
        FILTER_TAGS_APPEND: { tagName }
      })
      this.$router.push('/report')
    },
    clickDate (date) {
      date = new Date(date)
      reduce({
        FILTER_DATE_FROM: { dateFrom: date },
        FILTER_DATE_TO: { dateTo: date }
      })
      this.$router.push('/report')
    },
    edit (id) {
      const entry = this.entries.find((e) => e.id === id)
      entry.editing = true
    }
  }
}

module.exports = Recent
