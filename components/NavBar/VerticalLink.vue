<template lang="pug">
  .vertical-link
    nuxt-link(
      class="block px-4 py-3 border-b-2 border-gray-800 flex flex-row items-center whitespace-nowrap"
      :to="to"
    )
      icon(
        v-if="icon"
        :name="icon"
        extraClasses="mr-3"
      )
      slot
</template>
<script>
const VerticalMenuItem = {
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

export default VerticalMenuItem
</script>
