<template lang="pug">
  .duration(
    :class="classList"
  )
    icon(
      class="mr-1 w-4 h-4 inline -t-2"
      name="clock"
    )
    | {{ durationAsHHMM(duration) }}
</template>
<script>
import {
  durationAsHHMM
} from '../../lib/stringOps'

export default {
  props: {
    classMixins: {
      required: false,
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-prop-types
    duration: {
      required: true
    }
  },
  data () {
    const classList = [
      'rounded m-2 p-2 background-blue w-24',
      this.classMixins,
    ].join(' ')
    return {
      classList
    }
  },
  methods: {
    durationAsHHMM (duration) {
      return durationAsHHMM(duration)
    }
  }
}
</script>
