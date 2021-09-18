import {
  assert
} from '../../../lib/types'

const Item = {
  computed: {
    fieldsToggle () {
      return this.$store.state.entryList.fieldsToggle
    }
  },
  props: {
    entry: {
      type: Object,
      validator (entry) { return assert('isEntry', entry) }
    },
    clickTagHandler: {
      type: Function
    },
    clickDateHandler: {
      type: Function
    },
    clickUserHandler: {
      type: Function
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
