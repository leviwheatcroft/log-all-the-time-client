import {
  assert
} from '../../../../lib/types'

const EntryDisplay = {
  props: {
    entry: {
      required: true,
      type: Object,
      validator (entry) { return assert('isEntry', entry) }
    },
    fieldsToggle: {
      required: true,
      type: Object
    },
  },
  data () {
    return {
    }
  },
  methods: {}
}

export default EntryDisplay
