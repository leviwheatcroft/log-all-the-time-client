const { default: EntryDisplay } = require('../EntryDisplay')

const {
  mutations: {
    EntryQ
  }
} = require('../../apollo')

const Recent = {
  data () {
    return {
      entries: []
    }
  },
  apollo: {
    entries: {
      query: EntryQ,
      // query: gql`query EntryQ {
      //     EntryQ {
      //       raw
      //       date
      //       timeStart
      //       timeEnd
      //       duration
      //       tags
      //     }
      //   }
      // `,
      update (result) {
        console.log(result.EntryQ)
        return result.EntryQ
      }
    }
  },
  components: {
    EntryDisplay
  },
  methods: {}
}

module.exports = Recent
