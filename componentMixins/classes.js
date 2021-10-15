export const classes = {
  props: {
    extraClasses: {
      required: false,
      default: ''
    }
  },
  methods: {
    resolveClasses (...classes) {
      return Object.values(
        [
          ...classes,
          this.initialClasses,
          this.extraClasses,
        ].reduce((_, classes, i) => {
          return {
            ..._,
            ...typeof classes === 'string' ? { [i]: classes } : classes
          }
        }, {})
      ).join(' ').trim()
    }
  }
}
