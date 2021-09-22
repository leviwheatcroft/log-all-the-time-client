import {
  assert
} from '../../../../lib/types'
import {
  hexFromString
} from '../../../../lib/colors'

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
  methods: {
    hexFromString (str) {
      return hexFromString(str)
    },
  }
}

export default EntryDisplay
