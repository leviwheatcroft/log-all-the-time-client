<template lang="pug">
  .faux-input-label(
    :class="resolveClasses()"
  )
    slot
</template>
<script>
import {
  classes
} from '../../componentMixins'

const FauxInputLabel = {
  mixins: [classes],
  data () {
    // see https://tailwindcss.com/docs/width
    return {
      initialClasses: 'w-20'
    }
  }
}

export default FauxInputLabel
</script>
<style lang="less">
.faux-input-label {
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: right;
}
</style>
