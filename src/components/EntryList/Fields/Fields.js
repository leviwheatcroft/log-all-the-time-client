const {
  IconCalendar,
  IconClock,
  IconUser,
  IconTag
} = require('../../../icons')
const { reduce } = require('../../../store')
//
// const {
//   TagSelector
// } = require('../selectors')
// const {
//   mutations: {
//     EntryUpsertM,
//     EntryDeleteM
//   },
//   queries: {
//     EntryQ
//   }
// } = require('../../apollo')
// const {
//   dates: {
//     midnightUtc
//   },
//   types: {
//     isEntry,
//     isTag,
//     isNewTag
//   },
//   stringOps: {
//     parseHumanDuration,
//     durationAsHHMM,
//     durationFromHHMM
//   }
// } = require('../../lib')
// const {
//   reduce
// } = require('../../store')

const Fields = {
  components: {
    IconCalendar,
    IconClock,
    IconUser,
    IconTag
  },
  data () {
    return {}
  },
  methods: {
    clickField (field) {
      reduce({
        ENTRY_LIST_FIELDS_SET: {
          fields: {
            [field]: !this.fieldsToggle[field]
          }
        }
      })
    }
  },
  props: {
    fieldsToggle: {
      required: true,
      type: Object
    },
    fieldsToggleBoundaries: {
      required: true,
      type: Object
    }
  }
}

module.exports = Fields
