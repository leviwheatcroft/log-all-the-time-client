import {
  ValidState
} from '../../../lib/enums'

const Export = {
  data () {
    return {
      localExportDateFormat: this.userOptions.exportDateFormat,
      localExportDurationFormat: this.userOptions.exportDurationFormat,
      dateFormatValidState: ValidState.unchecked,
      durationFormatValidState: ValidState.unchecked
    }
  },
  methods: {
    validate () {
      const {
        localExportDateFormat,
        localExportDurationFormat
      } = this
      if (localExportDateFormat.length < 3)
        this.dateFormatValidState = ValidState.invalid
      else
        this.dateFormatValidState = ValidState.valid
      if (localExportDurationFormat.length < 3)
        this.durationFormatValidState = ValidState.invalid
      else
        this.durationFormatValidState = ValidState.valid
      return (
        this.dateFormatValidState &&
        this.durationFormatValidState
      )
    },
    clickSave () {
      this.$emit('save', {
        exportDateFormat: this.localExportDateFormat,
        exportDurationFormat: this.localExportDurationFormat
      })
    }
  },
  props: {
    userOptions: {
      required: true,
      type: Object
    },
    savePending: {
      required: true,
      type: Number
    }
  }
}

export default Export
