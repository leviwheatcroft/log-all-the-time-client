import {
  assert
} from '../../../lib/types'

const Item = {
  props: {
    entry: {
      type: Object,
      validator (entry) { return assert('isEntry', entry) }
    },
    fieldsToggle: {
      required: true,
      type: Object
    },
    idx: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      editing: false
    }
  },
  methods: {
  }
}

export default Item
