<template lang="pug">
  .faux-input(
    :class="resolveClasses()"
  )
    slot
</template>
<script>
import {
  classes
} from '../../componentMixins'

const FauxInput = {
  mixins: [classes]
}

export default FauxInput
</script>
<style lang="less">
.faux-input {
  background-color: @unfocusField;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.5rem;

  height: 2.5rem;
  &:focus-within {
    background-color: @focusField;
  }
  &.invalid {
    background-color: tint(@red, 80%);
  }
  svg.icon {
    top: 0 !important; // ugh
    flex-shrink: 0;
    // margin: 0.5rem;
  }
  input {
    // background-color: blue;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0.6rem;
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
