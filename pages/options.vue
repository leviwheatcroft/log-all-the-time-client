<template lang="pug">
  div(
    class="flex flex-row p-4 gap-4"
  )
    nav(
      class="flex flex-col gap-4"
    )
      tpl-button(
        :extraClasses="[active === 'general' ? 'active' : '']"
        @click="active = 'general'"
      )
        icon(
          extraClasses="mr-2"
          name="folder"
        )
        span
          | General
    div(
      class="flex-grow"
    )
      options-general(
        v-if="active === 'general'"
      )
</template>
<script>
const Options = {
  data () {
    return {
      active: 'general'
    }
  }
}

export default Options
</script>
