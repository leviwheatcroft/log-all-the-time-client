const Fields = {
  data () {
    return {}
  },
  methods: {
    clickField (field) {
      const currentValue = this.fieldsToggle[field]
      this.$store.commit('entryList/fieldsSet', { [field]: !currentValue })
    }
  },
  props: {
    fieldsToggleBoundaries: {
      required: true,
      type: Object
    },
    fieldsToggle: {
      required: true,
      type: Object
    },
  }
}

export default Fields
