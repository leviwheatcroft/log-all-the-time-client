<template>
  <svg
    class="icon"
    :width="width_"
    :height="height_"
    :style="{ position: 'relative', top: top + 'rem' }"
  >
    <use :href="`#i-${name}`" />
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: false,
      default: '24'
    },
    height: {
      type: String,
      required: false,
      default: ''
    },
    top: {
      type: String,
      required: false,
      default: '0.125'
    }
  },
  data () {
    const {
      width,
      height
    } = this
    const width_ = width
    const height_ = height || width
    return {
      width_,
      height_
    }
  }
}
</script>
