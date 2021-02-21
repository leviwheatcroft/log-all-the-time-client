const { default: DatePicker } = require('vue2-datepicker')
// const {
//   mutations: {
//     EntryAddM
//   },
//   queries: {
//     EntryQ
//   }
// } = require('../../apollo')
//
// const { resolvers: { resolve } } = require('../../lib')
const { reduce, state } = require('../../store')
const { default: EntryTagInput } = require('../EntryTagInput')

const EntryNew = {
  components: {
    EntryTagInput,
    DatePicker
  },
  watch: {
    date (date) {
      reduce({
        SET_LAST_SELECTED_DATE: { date }
      })
    }
  },
  data () {
    const {
      lastSelectedDate: date
    } = state
    return {
      date,
      duration: '',
      description: '',
      tagNames: []
    }
  },
  methods: {
    tagAdded (tag) {
      this.tagNames.push(tag)
    },
    tagRemoved (tag) {
      const idx = this.tagNames.findIndex((t) => t === tag)
      this.tagNames.splice(idx, 1)
    },
    async submit () {
    //   const entry = resolve({
    //     date: null,
    //     timeStart: null,
    //     timeEnd: null,
    //     duration: null,
    //     tags: [],
    //     raw: this.$data.raw,
    //     description: this.$data.raw
    //   })
    //   await this.$apollo.mutate({
    //     mutation: EntryAddM,
    //     variables: {
    //       entry
    //     },
    //     update: (store, ctx) => {
    //       const {
    //         data: {
    //           EntryAddM: result
    //         }
    //       } = ctx
    //
    //       const data = store.readQuery({ query: EntryQ })
    //       data.EntryQ.unshift(result)
    //       store.writeQuery({ query: EntryQ, data })
    //     },
    //     optimisticResponse: {
    //       __typename: 'Mutation',
    //       EntryAddM: {
    //         id: -1,
    //         __typename: 'Entry',
    //         ...entry,
    //         tags: entry.tags.map((tag) => ({
    //           __typename: 'Tag',
    //           id: -1,
    //           tag
    //         }))
    //       }
    //     }
    //   })
    }
  }
}

module.exports = EntryNew
