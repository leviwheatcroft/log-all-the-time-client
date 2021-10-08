<template>
  <svg
    :class="resolveClasses()"
    width="24"
    height="24"
    @click="$emit('click', $event)"
  >
    <use :href="`#i-${name}`" />
  </svg>
</template>

<script>
import {
  classes
} from '../componentMixins'

export default {
  mixins: [classes],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    const initialClasses = 'icon inline'
    return {
      initialClasses
    }
  }
}
</script>

<style scoped lang="less">
  svg.icon {
    position: relative;
    top: 0.125rem;
  }
</style>
