import {
  getValidator
} from '../../../lib/types'
import {
  ValidState
} from '../../../lib/enums'
import {
  classes
} from '../../../componentMixins'

const Description = {
  methods: {
    validate () {
      const {
        description
      } = this
      if (description.length < 3)
        this.validState = ValidState.invalid
      else
        this.validState = ValidState.valid
      return this.validState
    }
  },
  data () {
    const validState = ValidState.unchecked
    return {
      validState
    }
  },
  mixins: [classes],
  props: {
    inputTabindex: {
      required: true,
      type: Number
    },
    description: {
      required: true,
      validator: getValidator('isString')
    }
  }
}

export default Description
