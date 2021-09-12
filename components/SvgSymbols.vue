<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    style="display: none;"
    v-html="sprites"
  />
</template>
<script>
// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!!raw-loader!../assets/sprite/gen/icons.svg').default

export default {
  data: () => {
    const sprites = svg.replace(/.*?$/m, '') // strip declaration
    return { sprites }
  }
}
</script>
