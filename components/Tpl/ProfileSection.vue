<template lang="pug">
  .profile-section(
    class="w-2/4 mx-auto mt-8"
  )
    tpl-label-bar(
      class="cursor-pointer"
      @click.native="open = !open"
    )
      template(
        v-slot:label
      )
        slot(
          name="label"
        )
      template(
        v-slot:tools
      )
        tpl-button(
          extraClasses="bare"
        )
          icon(
            :name="open ? 'chevron-up' : 'chevron-down'"
          )
    slot(
      v-if="open"
    )
</template>
<script>
const ProfileSection = {
  data () {
    return { open: false }
  }
}
export default ProfileSection
</script>
