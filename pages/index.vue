<template lang="pug">
  .index
    entry-input
    //- duration-by-day
    entry-list(
      :clickDateHandler="clickDateHandler"
      :clickTagHandler="clickTagHandler"
      :clickProjectHandler="clickProjectHandler"
      :entries="entries"
      :fetchMoreEntries="fetchMoreEntries"
      :fieldsToggleBoundaries="fieldsToggleBoundaries"
      :loading="loading"
    )
</template>

<script>
import {
  EntryFilterQ
} from '../apollo/queries'
import {
  validator
} from '../lib/types'

const PageDashboard = {
  apollo: {
    entries: {
      query: EntryFilterQ,
      variables () {
        const limit = 24
        const offset = 0
        return {
          ...this.filters,
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
      }
    }
  },
  data () {
    return {
      filters: {
        self: true,
        sort: { createdAt: 'desc' }
      },
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
