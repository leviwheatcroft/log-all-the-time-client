export const classes = {
  props: {
    extraClasses: {
      required: false,
      type: String,
      default: ''
    }
  },
  methods: {
    resolveClasses (...classes) {
      return [
        ...classes,
        this.initialClasses || '',
        this.extraClasses
      ].join(' ')
    }
  }
}
