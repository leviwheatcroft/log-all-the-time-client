<template lang="pug">
  .alert(
    :class="resolveClasses()"
  )
    slot
</template>
<script>
import {
  classes
} from '../../componentMixins'

const Alert = {
  mixins: [classes],
  data () {
    return {
      initialClasses: { alertType: 'danger' }
    }
  }
}

export default Alert
</script>
<style scoped lang="less">
.alert {
  border-radius: 0.125rem;
  padding: 0.5rem 1rem;
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
  // just get these from https://getbootstrap.com/docs/4.0/components/alerts/
  &.danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
}
button.bare {
  background-color: transparent;
}
</style>
