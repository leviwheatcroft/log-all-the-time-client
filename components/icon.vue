<template>
  <svg
    class="icon"
    width="24"
    height="24"
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
