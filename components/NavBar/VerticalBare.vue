<template lang="pug">
  div
    .bare(
      class="block px-4 py-3 border-b-2 border-gray-800 flex flex-row items-center whitespace-nowrap cursor-pointer"
    )
      icon(
        v-if="icon"
        :name="icon"
        extraClasses="mr-3"
      )
      slot
</template>
<script>
const VerticalBare = {
  props: {
    icon: {
      type: String,
      required: false,
      default: ''
    }
  }
}

export default VerticalBare
</script>
