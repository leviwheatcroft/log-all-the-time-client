<template lang="pug">
  div(
    class="flex flex-row p-4 gap-4"
  )
    nav(
      class="flex flex-col gap-4"
    )
      tpl-button(
        :extraClasses="[active === 'projects' ? 'active' : '']"
        @click="active = 'projects'"
      )
        icon(
          extraClasses="mr-2"
          name="folder"
        )
        span
          | Projects
      tpl-button(
        :extraClasses="[active === 'tags' ? 'active' : '']"
        @click="active = 'tags'"
      )
        icon(
          extraClasses="mr-2"
          name="tag"
        )
        span
          | Tags
    div(
      class="flex-grow"
    )
      meta-projects(
        v-if="active === 'projects'"
      )
      meta-tags(
        v-if="active === 'tags'"
      )
</template>
<script>
const Meta = {
  data () {
    return {
      active: 'projects'
    }
  }
}

export default Meta
</script>
