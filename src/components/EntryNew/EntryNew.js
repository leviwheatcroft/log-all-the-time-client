const { default: EntryEditInput } = require('../EntryEditInput')
const { default: Submit } = require('./Submit')

const EntryNew = {
  components: {
    EntryEditInput,
    Submit
  },
  data () {
    return {
      entry: {}
    }
  },
  methods: {
    update (entry) {
      this.$data.entry = entry
    }
  }
}

module.exports = EntryNew
