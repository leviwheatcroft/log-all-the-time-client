
const ButtonIcon = {
  props: {
    iconName: {
      type: String,
      required: true
    },
    bare: {
      type: Boolean,
      default: false
    },
    after: {
      type: Boolean,
      default: false
    }
  },
}

export default ButtonIcon
