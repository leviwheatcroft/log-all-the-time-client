import { classes } from '../../../componentMixins'
import {
  ValidState
} from '../../../lib/enums'

const Projects = {
  data () {
    const validState = ValidState.unchecked
    return {
      validState
    }
  },
  mixins: [classes],
  methods: {
    validate () {
      const {
        items
      } = this

      if (items === null)
        this.validState = ValidState.invalid
      else
        this.validState = ValidState.valid
      return this.validState
    },
    resetValidation () {
      this.validState = ValidState.unchecked
    }
  },
  props: {
    items: {
      required: true
    },
    inputTabindex: {
      required: true,
      type: Number
    }
  },
  watch: {
    items () {
      if (this.validState === ValidState.unchecked)
        return
      this.validate()
    }
  }
}

export default Projects
