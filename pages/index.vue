<template lang="pug">
  .index
    entry-input
    day-summaries
    entry-list(
      :clickDateHandler="clickDateHandler"
      :clickTagHandler="clickTagHandler"
      :clickProjectHandler="clickProjectHandler"
      :entries="entries"
      :fetchMoreEntries="fetchMoreEntries"
      :fieldsToggleBoundaries="fieldsToggleBoundaries"
      :loading="loading"
    )
      template(
        v-slot:no-entries
      ) Your recent entries will be shown here.
</template>

<script>
import {
  EntryFilterQ
} from '../apollo/queries'
import {
  validator
} from '../lib/types'
import {
  AuthStatus
} from '../lib/enums'

const PageDashboard = {
  apollo: {
    entries: {
      query: EntryFilterQ,
      variables () {
        const limit = 24
        const offset = 0
        return {
          users: [this.user],
          sort: { createdAt: 'desc' },
          limit,
          offset
        }
      },
      // skip () {
      //   console.log('skipper', this.entries.length)
      //
      //   return this.entries.length !== 0
      // },
      nextFetchPolicy: 'cache-only',
      update ({ EntryFilterQ: { docs, hasMore } }) {
        this.hasMore = hasMore
        return docs
      },
      skip () {
        return this.authStatus !== AuthStatus.loggedIn
      }
    }
  },
  computed: {
    user () {
      const { id, name } = this.$store.state.user
      return { id, name }
    },
    authStatus () {
      return this.$store.state.auth.status
    }
  },
  data () {
    return {
      fieldsToggleBoundaries: {
        date: null,
        description: true,
        duration: null,
        project: null,
        tags: null,
        user: false
      },
      entries: [],
      loading: 0,
      hasMore: true
    }
  },
  methods: {
    clickTagHandler (tag) {
      validator('isTag', tag)
      this.$store.commit('entryList/filterTagsAppend', tag)
      this.$router.push('/report')
    },
    clickDateHandler (date) {
      validator('isMidnightUtc', date)
      this.$store.commit('filter/dateFrom', date)
      this.$store.commit('filter/dateTo', date)
      this.$router.push('/report')
    },
    clickProjectHandler (project) {
      validator('isProject', project)
      this.$store.commit('filter/project', project.id)
      this.$router.push('/report')
    },
    fetchMoreEntries () {
      if (this.loading)
        return
      if (!this.hasMore)
        return
      const variables = {
        ...this.filters,
        offset: this.entries.length,
        limit: 24
      }
      this.$apollo.queries.entries.fetchMore({
        variables
      })
    }
  }
}

export default PageDashboard
</script>
