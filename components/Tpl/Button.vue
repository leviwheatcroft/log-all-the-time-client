<template lang="pug">
  button(
    :class="resolveClasses()"
  )
    slot
</template>
<script>
import {
  classes
} from '../../componentMixins'

const Button = {
  mixins: [classes]
}

export default Button
</script>
<style scoped lang="less">
button {
  background-color: @unfocusField;
  padding: 0 0.5rem;
  &:focus {
    background-color: @focusField;
  }
  &.bare {
    background-color: transparent;
    &:focus {
      background-color: transparent;
    }
  }
  svg {
    top: 0rem !important;
    width: 1.25rem;
    height: 1.25rem;
  }
  > * {
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
