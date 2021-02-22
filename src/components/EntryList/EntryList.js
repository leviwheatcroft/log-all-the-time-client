const { default: EntryDisplay } = require('../EntryDisplay')
const { default: EntryEdit } = require('../EntryEdit')
/* eslint-disable no-prototype-builtins */

// const {
//   mutations: {
//     EntryQ
//   }
// } = require('../../apollo')

const EntryList = {
  props: {
    entry: {
      type: Object,
      validator (entry) {
        if (entry)
          return true
      }
    },
    clickTag: {
      type: Function
    },
    clickDate: {
      type: Function
    }
  },
  data () {
    return {
      editing: false
    }
  },
  components: {
    EntryDisplay,
    EntryEdit
  },
  methods: {

  }
}

module.exports = EntryList
