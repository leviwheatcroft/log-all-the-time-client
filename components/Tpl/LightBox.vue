<template lang="pug">
.light-box-background
  .light-box(
    :class="resolveClasses()"
  )
    slot
</template>
<script>
import {
  classes
} from '../../componentMixins'

const LightBox = {
  mixins: [classes]
}

export default LightBox
</script>
<style scoped lang="less">
.light-box-background {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: fadeout(@light20, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  .light-box {
    background-color: @light100;
    padding: 1.2rem 3.6rem;
    max-width: 80%;
    min-width: 30rem;
    /deep/ h1 {
      margin-top: 0;
    }
  }
}
</style>
