<template lang="pug">
  .shadow-box(
    :class="classList"
  )
    slot
</template>
<script>
export default {
  props: {
    classMixins: {
      required: false,
      type: String,
      default: ''
    }
  },
  data () {
    const classList = [
      '',
      this.classMixins,
    ].join(' ')
    return {
      classList
    }
  }
}
</script>
<style lang="less">
  .shadow-box {
    margin: 1rem;
    padding: 1rem;
    box-shadow: 0px 0px 3px 0px rgba(192,192,192,1);
  }
</style>
