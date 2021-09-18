const Fields = {
  data () {
    return {}
  },
  computed: {
    fieldsToggle () {
      return this.$store.state.entryList.fieldsToggle
    }
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
    }
  }
}

export default Fields
