<template lang="pug">
  .button-block
    slot
</template>
<script>
</script>
<style scoped lang="less">
  button {
    color: @light40;
    display: inline;
    border: 2px solid @light40;
    height: 2rem;
    margin-left: -2px;
    padding: 0.125rem 0.25rem;
    svg {
      top: -0.125rem !important;
    }
    &:first-child {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      margin-left: 0;
    }
    &:last-child {
      border-bottom-right-radius: 3px;
      border-top-right-radius: 3px;
    }
    &.active {
      background-color: @light90;
      color: @light10;
    }
  }
</style>
