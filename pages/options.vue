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
      tpl-button(
        :extraClasses="[active === 'export' ? 'active' : '']"
        @click="active = 'export'"
      )
        icon(
          extraClasses="mr-2"
          name="folder"
        )
        span
          | Export
    div(
      class="flex-grow"
    )
      options-general(
        v-if="active === 'general'"
        :userOptions="userOptions"
      )
      options-export(
        v-if="active === 'export'"
        :userOptions="userOptions"
        :savePending="savePending"
        @save="save($event)"
      )
</template>
<script>
import {
  UserOptionM
} from '../apollo/mutations'

const Options = {
  computed: {
    userOptions () { return this.$store.state.user.options },
  },
  data () {
    return {
      active: 'general',
      savePending: 0
    }
  },
  methods: {
    async save (options) {
      this.savePending += 1
      this.$store.commit('user/updateOptions', options)
      await this.$apollo.mutate({
        mutation: UserOptionM,
        variables: {
          options
        }
      })
      this.savePending -= 1
    }
  }
}

export default Options
</script>
