<template lang="pug">
  nuxt-link(
    :class="resolveClasses()"
    :to="to"
  )
    slot
</template>
<script>
const {
  classes
} = require('../../componentMixins')
const HorizontalLink = {
  data () {
    return {
      initialClasses: {
        frame: 'mx-4 pb-2',
        activatable: 'border-b-2 border-gray-800'
      }
    }
  },
  mixins: [classes],
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: ''
    }
  }
}

export default HorizontalLink
</script>
