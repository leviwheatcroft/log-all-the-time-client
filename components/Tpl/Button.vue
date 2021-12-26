<template lang="pug">
  button(
    :class="resolveClasses()"
    :tabindex="tabindex"
    @click="$emit('click', $event)"
  )
    slot
</template>
<script>
import {
  classes
} from '../../componentMixins'

const Button = {
  mixins: [classes],
  data () {
    return {
      initialClasses: 'text-left'
    }
  },
  props: {
    // a nuxt-link included in the slot will always be focussable
    tabindex: {
      type: Number,
      required: false,
      default: 0
    }
  }
}

export default Button
</script>
<style scoped lang="less">
button {
  outline: none;
  background-color: @unfocusField;
  padding: 0 0.5rem;
  height: 2.5rem;
  /**
   * TODO:
   * focus-within should work when a nuxt-link is focussed, but doesn't
   */
  &.active,
  &:focus,
  &:focus-within {
    background-color: @focusField;
  }
  &.bare {
    background-color: transparent;
    &:focus {
      background-color: transparent;
    }
  }
  /* /deep/ is necessary for buttons using nuxt-link */
  /deep/ a {
    outline: none;
  }
  /deep/ svg {
    top: 0rem !important;
    width: 1.25rem;
    height: 1.25rem;
  }
  /deep/ svg,
  /deep/ span {
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
button.bare {
  background-color: transparent;
}
button.disabled {
  cursor: not-allowed;
  color: @light60;
}
</style>
