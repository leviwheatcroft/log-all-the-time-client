<template lang="pug">
  .date(
    :class="classList"
  )
    icon(
      class="mr-1 w-4 h-4 inline -t-2"
      name="calendar"
    )
    | {{ $dayjs(date).format('D MMM') }}
</template>
<script>
import {
  assert
} from '../../lib/types'

export default {
  props: {
    classMixins: {
      required: false,
      type: String,
      default: ''
    },
    date: {
      required: true,
      validator (date) { return assert('isMidnightUtcMs', date) }
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
}
</script>
