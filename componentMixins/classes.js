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
          if (typeof classes === 'string')
            _[i] = classes
          else if (Array.isArray(classes))
            _[i] = classes
          else
            _ = { ..._, ...classes }
          return _
        }, {})
      ).flat().join(' ').trim()
    }
  }
}
