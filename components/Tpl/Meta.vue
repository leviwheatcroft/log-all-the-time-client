<template lang="pug">
  .meta(
    :class="resolveClasses()"
    :style="{ ...hashColor ? { backgroundColor: asRgb(hashColor) } : {} }"
  )
    icon(
      v-if="icon"
      class="mr-1 w-4 h-4 inline"
      :name="icon"
    )
    slot
</template>
<script>
import {
  classes
} from '../../componentMixins'
import {
  asRgb
} from '../../lib/colors'

const Meta = {
  data () {
    return {
      initialClasses: 'rounded m-2 p-2 background-blue whitespace-nowrap min-content'
    }
  },
  mixins: [classes],
  props: {
    icon: {
      type: String
    },
    hashColor: {
      type: String
    }
  },
  methods: {
    asRgb
  }
}

export default Meta
</script>
<style scoped lang="less">
/deep/ svg.icon {
  top: -0.0675rem;
}
</style>
